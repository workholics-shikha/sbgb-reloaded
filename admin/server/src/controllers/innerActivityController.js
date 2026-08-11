const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { getMySqlPool } = require("../config/mysql");

const INNER_ACTIVITY_UPLOAD_DIR = path.join(process.cwd(), "uploads", "inner-activities");

fs.mkdirSync(INNER_ACTIVITY_UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, INNER_ACTIVITY_UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname || "").toLowerCase() || ".png";
    const basename = path
      .basename(file.originalname || "inner-activity-image", extension)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40);

    cb(null, `${Date.now()}-${basename || "inner-activity-image"}${extension}`);
  },
});

const uploadInnerActivityImage = multer({
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

function mapInnerActivity(row) {
  return {
    id: String(row.id),
    activity_id: row.activity_id != null ? String(row.activity_id) : "",
    name: row.name || "",
    description: row.description || "",
    image: row.image || "",
    position: row.position != null ? Number(row.position) : 0,
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

function uploadInnerActivityImageHandler(req, res) {
  uploadInnerActivityImage.single("image")(req, res, (error) => {
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
      image: `/uploads/inner-activities/${req.file.filename}`,
      filename: req.file.filename,
    });
  });
}

async function listInnerActivities(req, res) {
  const pool = getMySqlPool();
  const [rows] = await pool.execute(
    "SELECT id, activity_id, name, description, image, position, created_at, updated_at, status FROM inner_activities ORDER BY id DESC",
  );

  return res.json(rows.map(mapInnerActivity));
}

async function createInnerActivity(req, res) {
  const { activity_id, name, description, image, position, status } = req.body || {};
  const normalizedActivityId = Number(activity_id);
  const normalizedName = String(name || "").trim();
  const normalizedDescription = String(description || "").trim();
  const normalizedImage = String(image || "").trim();
  const normalizedPosition = Number(position || 0);
  const normalizedStatus = normalizeStatus(status);

  if (!Number.isInteger(normalizedActivityId) || normalizedActivityId <= 0) {
    return res.status(400).json({ message: "Activity is required" });
  }
  if (!normalizedName) return res.status(400).json({ message: "Name is required" });
  if (!normalizedDescription) return res.status(400).json({ message: "Description is required" });
  if (!normalizedImage) return res.status(400).json({ message: "Image is required" });
  if (!Number.isFinite(normalizedPosition) || normalizedPosition < 0) {
    return res.status(400).json({ message: "Position must be zero or greater" });
  }
  if (normalizedStatus == null) return res.status(400).json({ message: "Status is required" });

  const pool = getMySqlPool();
  const [result] = await pool.execute(
    "INSERT INTO inner_activities (activity_id, name, description, image, position, created_at, updated_at, status) VALUES (?, ?, ?, ?, ?, NOW(), NOW(), ?)",
    [
      normalizedActivityId,
      normalizedName,
      normalizedDescription,
      normalizedImage,
      normalizedPosition,
      normalizedStatus,
    ],
  );

  const [rows] = await pool.execute(
    "SELECT id, activity_id, name, description, image, position, created_at, updated_at, status FROM inner_activities WHERE id = ? LIMIT 1",
    [result.insertId],
  );

  return res.status(201).json(mapInnerActivity(rows[0]));
}

async function updateInnerActivity(req, res) {
  const { id } = req.params;
  const { activity_id, name, description, image, position, status } = req.body || {};
  const fields = [];
  const values = [];

  if (activity_id !== undefined) {
    const normalizedActivityId = Number(activity_id);
    if (!Number.isInteger(normalizedActivityId) || normalizedActivityId <= 0) {
      return res.status(400).json({ message: "Activity is required" });
    }
    fields.push("activity_id = ?");
    values.push(normalizedActivityId);
  }

  if (name !== undefined) {
    const normalizedName = String(name).trim();
    if (!normalizedName) return res.status(400).json({ message: "Name is required" });
    fields.push("name = ?");
    values.push(normalizedName);
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

  if (position !== undefined) {
    const normalizedPosition = Number(position);
    if (!Number.isFinite(normalizedPosition) || normalizedPosition < 0) {
      return res.status(400).json({ message: "Position must be zero or greater" });
    }
    fields.push("position = ?");
    values.push(normalizedPosition);
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
    `UPDATE inner_activities SET ${fields.join(", ")}, updated_at = NOW() WHERE id = ?`,
    values,
  );

  if (!result.affectedRows) {
    return res.status(404).json({ message: "Inner activity not found" });
  }

  const [rows] = await pool.execute(
    "SELECT id, activity_id, name, description, image, position, created_at, updated_at, status FROM inner_activities WHERE id = ? LIMIT 1",
    [Number(id)],
  );

  return res.json(mapInnerActivity(rows[0]));
}

module.exports = {
  listInnerActivities,
  uploadInnerActivityImageHandler,
  createInnerActivity,
  updateInnerActivity,
};
