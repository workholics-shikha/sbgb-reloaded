const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { getMySqlPool } = require("../config/mysql");

const ACTIVITY_UPLOAD_DIR = path.join(process.cwd(), "uploads", "activities");

fs.mkdirSync(ACTIVITY_UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, ACTIVITY_UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname || "").toLowerCase() || ".png";
    const basename = path
      .basename(file.originalname || "activity-image", extension)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40);

    cb(null, `${Date.now()}-${basename || "activity-image"}${extension}`);
  },
});

const uploadActivityImage = multer({
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

function mapActivity(row) {
  return {
    id: String(row.id),
    name: row.name || "",
    description: row.description || "",
    image: row.image || "",
    cat_id: row.cat_id != null ? String(row.cat_id) : "",
    type: row.type || "",
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

function uploadActivityImageHandler(req, res) {
  uploadActivityImage.single("image")(req, res, (error) => {
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
      image: `/uploads/activities/${req.file.filename}`,
      filename: req.file.filename,
    });
  });
}

async function listActivities(req, res) {
  const pool = getMySqlPool();
  const [rows] = await pool.execute(
    "SELECT id, name, description, image, cat_id, type, created_at, updated_at, status FROM activities ORDER BY id DESC",
  );

  return res.json(rows.map(mapActivity));
}

async function createActivity(req, res) {
  const { name, description, image, cat_id, type, status } = req.body || {};
  const normalizedName = String(name || "").trim();
  const normalizedDescription = String(description || "").trim();
  const normalizedImage = String(image || "").trim();
  const normalizedCatId = Number(cat_id);
  const normalizedType = String(type || "").trim().toLowerCase();
  const normalizedStatus = normalizeStatus(status);

  if (!normalizedName) return res.status(400).json({ message: "Name is required" });
  if (!normalizedImage) return res.status(400).json({ message: "Image is required" });
  if (!Number.isInteger(normalizedCatId) || normalizedCatId <= 0) {
    return res.status(400).json({ message: "Category is required" });
  }
  if (!normalizedType) return res.status(400).json({ message: "Type is required" });
  if (normalizedStatus == null) return res.status(400).json({ message: "Status is required" });

  const pool = getMySqlPool();
  const [result] = await pool.execute(
    "INSERT INTO activities (name, description, image, cat_id, type, created_at, updated_at, status) VALUES (?, ?, ?, ?, ?, NOW(), NOW(), ?)",
    [normalizedName, normalizedDescription, normalizedImage, normalizedCatId, normalizedType, normalizedStatus],
  );

  const [rows] = await pool.execute(
    "SELECT id, name, description, image, cat_id, type, created_at, updated_at, status FROM activities WHERE id = ? LIMIT 1",
    [result.insertId],
  );

  return res.status(201).json(mapActivity(rows[0]));
}

async function updateActivity(req, res) {
  const { id } = req.params;
  const { name, description, image, cat_id, type, status } = req.body || {};
  const fields = [];
  const values = [];

  if (name !== undefined) {
    const normalizedName = String(name).trim();
    if (!normalizedName) return res.status(400).json({ message: "Name is required" });
    fields.push("name = ?");
    values.push(normalizedName);
  }

  if (description !== undefined) {
    fields.push("description = ?");
    values.push(String(description).trim());
  }

  if (image !== undefined) {
    const normalizedImage = String(image).trim();
    if (!normalizedImage) return res.status(400).json({ message: "Image is required" });
    fields.push("image = ?");
    values.push(normalizedImage);
  }

  if (cat_id !== undefined) {
    const normalizedCatId = Number(cat_id);
    if (!Number.isInteger(normalizedCatId) || normalizedCatId <= 0) {
      return res.status(400).json({ message: "Category is required" });
    }
    fields.push("cat_id = ?");
    values.push(normalizedCatId);
  }

  if (type !== undefined) {
    const normalizedType = String(type).trim().toLowerCase();
    if (!normalizedType) return res.status(400).json({ message: "Type is required" });
    fields.push("type = ?");
    values.push(normalizedType);
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
    `UPDATE activities SET ${fields.join(", ")}, updated_at = NOW() WHERE id = ?`,
    values,
  );

  if (!result.affectedRows) {
    return res.status(404).json({ message: "Activity not found" });
  }

  const [rows] = await pool.execute(
    "SELECT id, name, description, image, cat_id, type, created_at, updated_at, status FROM activities WHERE id = ? LIMIT 1",
    [Number(id)],
  );

  return res.json(mapActivity(rows[0]));
}

async function deleteActivity(req, res) {
  const pool = getMySqlPool();
  const [result] = await pool.execute("DELETE FROM activities WHERE id = ?", [Number(req.params.id)]);

  if (!result.affectedRows) {
    return res.status(404).json({ message: "Activity not found" });
  }

  return res.json({ message: "Activity deleted" });
}

module.exports = {
  listActivities,
  uploadActivityImageHandler,
  createActivity,
  updateActivity,
  deleteActivity,
};
