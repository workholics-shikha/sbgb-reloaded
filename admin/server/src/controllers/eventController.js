const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { getMySqlPool } = require("../config/mysql");

const EVENT_UPLOAD_DIR = path.join(process.cwd(), "uploads", "events");

fs.mkdirSync(EVENT_UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, EVENT_UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname || "").toLowerCase() || ".png";
    const basename = path
      .basename(file.originalname || "event-image", extension)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40);

    cb(null, `${Date.now()}-${basename || "event-image"}${extension}`);
  },
});

const uploadEventImage = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype || !file.mimetype.startsWith("image/")) {
      cb(new Error("Only image uploads are allowed"));
      return;
    }

    cb(null, true);
  },
});

function mapEvent(row) {
  return {
    id: String(row.id),
    category_id: row.category_id != null ? String(row.category_id) : "",
    category: row.category_name || "",
    title: row.title || "",
    from_date: row.from_date || "",
    to_date: row.to_date || "",
    description: row.description || "",
    image: row.image || "",
    status: Number(row.status) === 1 ? 1 : 0,
    is_active: Number(row.status) === 1,
    created_at: row.created_at ? new Date(row.created_at).toISOString() : "",
    updated_at: row.updated_at ? new Date(row.updated_at).toISOString() : null,
  };
}

function normalizeStatus(value) {
  if (value === true || value === "1" || value === 1) return 1;
  if (value === false || value === "0" || value === 0) return 0;
  return null;
}

function uploadEventImageHandler(req, res) {
  uploadEventImage.single("image")(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "Image must be 5MB or smaller" });
      }

      return res.status(400).json({ message: error.message || "Unable to upload image" });
    }

    if (error) {
      return res.status(400).json({ message: error.message || "Unable to upload image" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    return res.status(201).json({
      image: `/uploads/events/${req.file.filename}`,
      filename: req.file.filename,
    });
  });
}

async function listEvents(req, res) {
  const pool = getMySqlPool();
  const [rows] = await pool.execute(
    `SELECT e.id, e.category_id, e.title, e.from_date, e.to_date, e.description, e.image, e.created_at, e.updated_at, e.status,
            c.category_name
       FROM events e
       LEFT JOIN categories c ON c.id = e.category_id
      ORDER BY e.id DESC`,
  );

  return res.json(rows.map(mapEvent));
}

async function getEvent(req, res) {
  const pool = getMySqlPool();
  const [rows] = await pool.execute(
    `SELECT e.id, e.category_id, e.title, e.from_date, e.to_date, e.description, e.image, e.created_at, e.updated_at, e.status,
            c.category_name
       FROM events e
       LEFT JOIN categories c ON c.id = e.category_id
      WHERE e.id = ?
      LIMIT 1`,
    [Number(req.params.id)],
  );

  if (!rows.length) {
    return res.status(404).json({ message: "Event not found" });
  }

  return res.json(mapEvent(rows[0]));
}

async function createEvent(req, res) {
  const { category_id, title, from_date, to_date, description, image, status } = req.body || {};
  const normalizedCategoryId = Number(category_id);
  const normalizedTitle = String(title || "").trim();
  const normalizedFromDate = String(from_date || "").trim();
  const normalizedToDate = String(to_date || "").trim();
  const normalizedDescription = String(description || "").trim();
  const normalizedImage = String(image || "").trim();
  const normalizedStatus = normalizeStatus(status);

  if (!Number.isInteger(normalizedCategoryId) || normalizedCategoryId <= 0) {
    return res.status(400).json({ message: "Category is required" });
  }
  if (!normalizedTitle) return res.status(400).json({ message: "Title is required" });
  if (!normalizedFromDate) return res.status(400).json({ message: "From date is required" });
  if (!normalizedToDate) return res.status(400).json({ message: "To date is required" });
  if (!normalizedDescription) return res.status(400).json({ message: "Description is required" });
  if (!normalizedImage) return res.status(400).json({ message: "Image is required" });
  if (normalizedStatus == null) return res.status(400).json({ message: "Status is required" });

  const pool = getMySqlPool();
  const [result] = await pool.execute(
    "INSERT INTO events (category_id, title, from_date, to_date, description, image, created_at, updated_at, status) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW(), ?)",
    [
      normalizedCategoryId,
      normalizedTitle,
      normalizedFromDate,
      normalizedToDate,
      normalizedDescription,
      normalizedImage,
      normalizedStatus,
    ],
  );

  req.params.id = String(result.insertId);
  return getEvent(req, res);
}

async function updateEvent(req, res) {
  const { id } = req.params;
  const { category_id, title, from_date, to_date, description, image, status } = req.body || {};
  const fields = [];
  const values = [];

  if (category_id !== undefined) {
    const normalizedCategoryId = Number(category_id);
    if (!Number.isInteger(normalizedCategoryId) || normalizedCategoryId <= 0) {
      return res.status(400).json({ message: "Category is required" });
    }
    fields.push("category_id = ?");
    values.push(normalizedCategoryId);
  }

  if (title !== undefined) {
    const normalizedTitle = String(title).trim();
    if (!normalizedTitle) return res.status(400).json({ message: "Title is required" });
    fields.push("title = ?");
    values.push(normalizedTitle);
  }

  if (from_date !== undefined) {
    const normalizedFromDate = String(from_date).trim();
    if (!normalizedFromDate) return res.status(400).json({ message: "From date is required" });
    fields.push("from_date = ?");
    values.push(normalizedFromDate);
  }

  if (to_date !== undefined) {
    const normalizedToDate = String(to_date).trim();
    if (!normalizedToDate) return res.status(400).json({ message: "To date is required" });
    fields.push("to_date = ?");
    values.push(normalizedToDate);
  }

  if (description !== undefined) {
    const normalizedDescription = String(description).trim();
    if (!normalizedDescription) return res.status(400).json({ message: "Description is required" });
    fields.push("description = ?");
    values.push(normalizedDescription);
  }

  if (image !== undefined) {
    const normalizedImage = String(image).trim();
    if (!normalizedImage) return res.status(400).json({ message: "Image is required" });
    fields.push("image = ?");
    values.push(normalizedImage);
  }

  if (status !== undefined) {
    const normalizedStatus = normalizeStatus(status);
    if (normalizedStatus == null) return res.status(400).json({ message: "Invalid status" });
    fields.push("status = ?");
    values.push(normalizedStatus);
  }

  if (fields.length === 0) {
    return res.status(400).json({ message: "No valid fields to update" });
  }

  const pool = getMySqlPool();
  values.push(Number(id));
  const [result] = await pool.execute(
    `UPDATE events SET ${fields.join(", ")}, updated_at = NOW() WHERE id = ?`,
    values,
  );

  if (!result.affectedRows) {
    return res.status(404).json({ message: "Event not found" });
  }

  return getEvent(req, res);
}

async function deleteEvent(req, res) {
  const pool = getMySqlPool();
  const [result] = await pool.execute("DELETE FROM events WHERE id = ?", [Number(req.params.id)]);

  if (!result.affectedRows) {
    return res.status(404).json({ message: "Event not found" });
  }

  return res.json({ message: "Event deleted" });
}

module.exports = {
  listEvents,
  getEvent,
  uploadEventImageHandler,
  createEvent,
  updateEvent,
  deleteEvent,
};
