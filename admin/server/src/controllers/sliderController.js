const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { getMySqlPool } = require("../config/mysql");

const SLIDER_UPLOAD_DIR = path.join(process.cwd(), "uploads", "sliders");

fs.mkdirSync(SLIDER_UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, SLIDER_UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname || "").toLowerCase() || ".png";
    const basename = path
      .basename(file.originalname || "slider-image", extension)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40);

    cb(null, `${Date.now()}-${basename || "slider-image"}${extension}`);
  },
});

const uploadSliderImage = multer({
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

function mapSlider(row) {
  return {
    id: String(row.id),
    title: row.title || "",
    type: row.type || "",
    image: row.image || "",
    status: Number(row.status) === 1 ? 1 : 0,
    is_active: Number(row.status) === 1,
    created_at: row.created_at ? new Date(row.created_at).toISOString() : "",
    updated_at: row.updated_at ? new Date(row.updated_at).toISOString() : null,
  };
}

function normalizeType(value) {
  const normalized = String(value || "").trim();
  return normalized || null;
}

function normalizeStatus(value) {
  if (value === true || value === "1" || value === 1) return 1;
  if (value === false || value === "0" || value === 0) return 0;
  return null;
}

async function listSliders(req, res) {
  const pool = getMySqlPool();
  const [rows] = await pool.execute(
    "SELECT id, type, title, image, created_at, updated_at, status FROM sliders ORDER BY created_at DESC, id DESC",
  );

  return res.json(rows.map(mapSlider));
}

function uploadSliderImageHandler(req, res) {
  uploadSliderImage.single("image")(req, res, (error) => {
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
      image: `/uploads/sliders/${req.file.filename}`,
      filename: req.file.filename,
    });
  });
}

async function createSlider(req, res) {
  const { title, type, image, status } = req.body || {};
  const normalizedType = normalizeType(type);
  const normalizedStatus = normalizeStatus(status);

  if (!String(title || "").trim()) {
    return res.status(400).json({ message: "Title is required" });
  }

  if (!normalizedType) {
    return res.status(400).json({ message: "Type is required" });
  }

  if (!String(image || "").trim()) {
    return res.status(400).json({ message: "Image is required" });
  }

  if (normalizedStatus == null) {
    return res.status(400).json({ message: "Status is required" });
  }

  const pool = getMySqlPool();
  const [result] = await pool.execute(
    "INSERT INTO sliders (type, title, image, status, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())",
    [normalizedType, String(title).trim(), String(image).trim(), normalizedStatus],
  );

  const [rows] = await pool.execute(
    "SELECT id, type, title, image, created_at, updated_at, status FROM sliders WHERE id = ? LIMIT 1",
    [result.insertId],
  );

  return res.status(201).json(mapSlider(rows[0]));
}

async function updateSlider(req, res) {
  const { id } = req.params;
  const { title, type, image, status } = req.body || {};
  const fields = [];
  const values = [];

  if (title !== undefined) {
    const normalizedTitle = String(title).trim();
    if (!normalizedTitle) {
      return res.status(400).json({ message: "Title is required" });
    }
    fields.push("title = ?");
    values.push(normalizedTitle);
  }

  if (type !== undefined) {
    const normalizedType = normalizeType(type);
    if (!normalizedType) {
      return res.status(400).json({ message: "Type is required" });
    }
    fields.push("type = ?");
    values.push(normalizedType);
  }

  if (image !== undefined) {
    const normalizedImage = String(image).trim();
    if (!normalizedImage) {
      return res.status(400).json({ message: "Image is required" });
    }
    fields.push("image = ?");
    values.push(normalizedImage);
  }

  if (status !== undefined) {
    const normalizedStatus = normalizeStatus(status);
    if (normalizedStatus == null) {
      return res.status(400).json({ message: "Status must be active or inactive" });
    }
    fields.push("status = ?");
    values.push(normalizedStatus);
  }

  if (fields.length === 0) {
    return res.status(400).json({ message: "No valid fields to update" });
  }

  const pool = getMySqlPool();
  values.push(Number(id));
  const [result] = await pool.execute(
    `UPDATE sliders SET ${fields.join(", ")}, updated_at = NOW() WHERE id = ?`,
    values,
  );

  if (!result.affectedRows) {
    return res.status(404).json({ message: "Slider not found" });
  }

  const [rows] = await pool.execute(
    "SELECT id, type, title, image, created_at, updated_at, status FROM sliders WHERE id = ? LIMIT 1",
    [Number(id)],
  );

  return res.json(mapSlider(rows[0]));
}

async function deleteSlider(req, res) {
  const pool = getMySqlPool();
  const [result] = await pool.execute("DELETE FROM sliders WHERE id = ?", [Number(req.params.id)]);

  if (!result.affectedRows) {
    return res.status(404).json({ message: "Slider not found" });
  }

  return res.json({ message: "Slider deleted" });
}

module.exports = { listSliders, uploadSliderImageHandler, createSlider, updateSlider, deleteSlider };
