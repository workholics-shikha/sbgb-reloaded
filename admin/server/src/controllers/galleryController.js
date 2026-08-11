const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { getMySqlPool } = require("../config/mysql");

const GALLERY_UPLOAD_DIR = path.join(process.cwd(), "uploads", "galleries");

fs.mkdirSync(GALLERY_UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, GALLERY_UPLOAD_DIR),
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname || "").toLowerCase() || ".png";
    const basename = path
      .basename(file.originalname || "gallery-image", extension)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40);

    cb(null, `${Date.now()}-${basename || "gallery-image"}${extension}`);
  },
});

const uploadGalleryImage = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype || !file.mimetype.startsWith("image/")) {
      cb(new Error("Only image uploads are allowed"));
      return;
    }

    cb(null, true);
  },
});

function mapGallery(row) {
  return {
    id: String(row.id),
    category_id: row.category_id != null ? String(row.category_id) : "",
    category: row.category_name || "",
    title: row.title || "",
    image: row.image || "",
    year: row.year || "",
    updated_at: row.updated_at ? new Date(row.updated_at).toISOString() : null,
    status: Number(row.status) === 1 ? 1 : 0,
    is_active: Number(row.status) === 1,
    created_at: row.created_at ? new Date(row.created_at).toISOString() : "",
  };
}

function normalizeStatus(value) {
  if (value === true || value === "1" || value === 1) return 1;
  if (value === false || value === "0" || value === 0) return 0;
  return null;
}

function uploadGalleryImageHandler(req, res) {
  uploadGalleryImage.single("image")(req, res, (error) => {
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
      image: `/uploads/galleries/${req.file.filename}`,
      filename: req.file.filename,
    });
  });
}

async function listGalleries(req, res) {
  const pool = getMySqlPool();
  const [rows] = await pool.execute(
    `SELECT g.id, g.category_id, g.title, g.image, g.year, g.created_at, g.updated_at, g.status, c.category_name
       FROM galleries g
       LEFT JOIN categories c ON c.id = g.category_id
      ORDER BY g.id DESC`,
  );

  return res.json(rows.map(mapGallery));
}

async function createGallery(req, res) {
  const { category_id, title, image, year, status } = req.body || {};
  const normalizedCategoryId = Number(category_id);
  const normalizedTitle = String(title || "").trim();
  const normalizedImage = String(image || "").trim();
  const normalizedYear = String(year || "").trim();
  const normalizedStatus = normalizeStatus(status);

  if (!Number.isInteger(normalizedCategoryId) || normalizedCategoryId <= 0) {
    return res.status(400).json({ message: "Category is required" });
  }
  if (!normalizedTitle) return res.status(400).json({ message: "Title is required" });
  if (!normalizedImage) return res.status(400).json({ message: "Image is required" });
  if (!normalizedYear) return res.status(400).json({ message: "Year is required" });
  if (normalizedStatus == null) return res.status(400).json({ message: "Status is required" });

  const pool = getMySqlPool();
  const [result] = await pool.execute(
    "INSERT INTO galleries (category_id, title, image, year, created_at, updated_at, status) VALUES (?, ?, ?, ?, NOW(), NOW(), ?)",
    [normalizedCategoryId, normalizedTitle, normalizedImage, normalizedYear, normalizedStatus],
  );

  const [rows] = await pool.execute(
    `SELECT g.id, g.category_id, g.title, g.image, g.year, g.created_at, g.updated_at, g.status, c.category_name
       FROM galleries g
       LEFT JOIN categories c ON c.id = g.category_id
      WHERE g.id = ?
      LIMIT 1`,
    [result.insertId],
  );

  return res.status(201).json(mapGallery(rows[0]));
}

async function updateGallery(req, res) {
  const { id } = req.params;
  const { category_id, title, image, year, status } = req.body || {};
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

  if (image !== undefined) {
    const normalizedImage = String(image).trim();
    if (!normalizedImage) return res.status(400).json({ message: "Image is required" });
    fields.push("image = ?");
    values.push(normalizedImage);
  }

  if (year !== undefined) {
    const normalizedYear = String(year).trim();
    if (!normalizedYear) return res.status(400).json({ message: "Year is required" });
    fields.push("year = ?");
    values.push(normalizedYear);
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
  const [result] = await pool.execute(`UPDATE galleries SET ${fields.join(", ")}, updated_at = NOW() WHERE id = ?`, values);

  if (!result.affectedRows) {
    return res.status(404).json({ message: "Gallery not found" });
  }

  const [rows] = await pool.execute(
    `SELECT g.id, g.category_id, g.title, g.image, g.year, g.created_at, g.updated_at, g.status, c.category_name
       FROM galleries g
       LEFT JOIN categories c ON c.id = g.category_id
      WHERE g.id = ?
      LIMIT 1`,
    [Number(id)],
  );

  return res.json(mapGallery(rows[0]));
}

async function deleteGallery(req, res) {
  const pool = getMySqlPool();
  const [result] = await pool.execute("DELETE FROM galleries WHERE id = ?", [Number(req.params.id)]);

  if (!result.affectedRows) {
    return res.status(404).json({ message: "Gallery not found" });
  }

  return res.json({ message: "Gallery deleted" });
}

module.exports = { listGalleries, uploadGalleryImageHandler, createGallery, updateGallery, deleteGallery };
