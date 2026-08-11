const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { getMySqlPool } = require("../config/mysql");

const MEDIA_UPLOAD_DIR = path.join(process.cwd(), "uploads", "medias");

fs.mkdirSync(MEDIA_UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, MEDIA_UPLOAD_DIR),
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname || "").toLowerCase() || ".png";
    const basename = path
      .basename(file.originalname || "media-image", extension)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40);

    cb(null, `${Date.now()}-${basename || "media-image"}${extension}`);
  },
});

const uploadMediaImage = multer({
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

function mapMedia(row) {
  return {
    id: String(row.id),
    category_id: row.category_id != null ? String(row.category_id) : "",
    category: row.category_name || "",
    type: row.type || "",
    image: row.image || "",
    title: row.title || "",
    published_date: row.published_date || "",
    publisher_name: row.publisher_name || "",
    description: row.description || "",
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

function uploadMediaImageHandler(req, res) {
  uploadMediaImage.single("image")(req, res, (error) => {
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
      image: `/uploads/medias/${req.file.filename}`,
      filename: req.file.filename,
    });
  });
}

async function listMedias(req, res) {
  const pool = getMySqlPool();
  const [rows] = await pool.execute(
    `SELECT m.id, m.category_id, m.type, m.image, m.title, m.published_date, m.publisher_name, m.description, m.created_at, m.updated_at, m.status,
            c.category_name
       FROM medias m
       LEFT JOIN categories c ON c.id = m.category_id
      ORDER BY m.id DESC`,
  );

  return res.json(rows.map(mapMedia));
}

async function createMedia(req, res) {
  const { category_id, type, image, title, published_date, publisher_name, description, status } = req.body || {};
  const normalizedCategoryId = Number(category_id);
  const normalizedType = String(type || "").trim();
  const normalizedImage = String(image || "").trim();
  const normalizedTitle = String(title || "").trim();
  const normalizedPublishedDate = String(published_date || "").trim();
  const normalizedPublisherName = String(publisher_name || "").trim();
  const normalizedDescription = String(description || "").trim();
  const normalizedStatus = normalizeStatus(status);

  if (!Number.isInteger(normalizedCategoryId) || normalizedCategoryId <= 0) {
    return res.status(400).json({ message: "Category is required" });
  }
  if (!normalizedType) return res.status(400).json({ message: "Type is required" });
  if (!normalizedImage) return res.status(400).json({ message: "Image is required" });
  if (!normalizedTitle) return res.status(400).json({ message: "Title is required" });
  if (!normalizedPublishedDate) return res.status(400).json({ message: "Published date is required" });
  if (!normalizedPublisherName) return res.status(400).json({ message: "Publisher name is required" });
  if (normalizedStatus == null) return res.status(400).json({ message: "Status is required" });

  const pool = getMySqlPool();
  const [result] = await pool.execute(
    "INSERT INTO medias (category_id, type, image, title, published_date, publisher_name, description, created_at, updated_at, status) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?)",
    [
      normalizedCategoryId,
      normalizedType,
      normalizedImage,
      normalizedTitle,
      normalizedPublishedDate,
      normalizedPublisherName,
      normalizedDescription,
      normalizedStatus,
    ],
  );

  const [rows] = await pool.execute(
    `SELECT m.id, m.category_id, m.type, m.image, m.title, m.published_date, m.publisher_name, m.description, m.created_at, m.updated_at, m.status,
            c.category_name
       FROM medias m
       LEFT JOIN categories c ON c.id = m.category_id
      WHERE m.id = ?
      LIMIT 1`,
    [result.insertId],
  );

  return res.status(201).json(mapMedia(rows[0]));
}

async function updateMedia(req, res) {
  const { id } = req.params;
  const { category_id, type, image, title, published_date, publisher_name, description, status } = req.body || {};
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

  if (type !== undefined) {
    const normalizedType = String(type).trim();
    if (!normalizedType) return res.status(400).json({ message: "Type is required" });
    fields.push("type = ?");
    values.push(normalizedType);
  }

  if (image !== undefined) {
    const normalizedImage = String(image).trim();
    if (!normalizedImage) return res.status(400).json({ message: "Image is required" });
    fields.push("image = ?");
    values.push(normalizedImage);
  }

  if (title !== undefined) {
    const normalizedTitle = String(title).trim();
    if (!normalizedTitle) return res.status(400).json({ message: "Title is required" });
    fields.push("title = ?");
    values.push(normalizedTitle);
  }

  if (published_date !== undefined) {
    const normalizedPublishedDate = String(published_date).trim();
    if (!normalizedPublishedDate) return res.status(400).json({ message: "Published date is required" });
    fields.push("published_date = ?");
    values.push(normalizedPublishedDate);
  }

  if (publisher_name !== undefined) {
    const normalizedPublisherName = String(publisher_name).trim();
    if (!normalizedPublisherName) return res.status(400).json({ message: "Publisher name is required" });
    fields.push("publisher_name = ?");
    values.push(normalizedPublisherName);
  }

  if (description !== undefined) {
    fields.push("description = ?");
    values.push(String(description).trim());
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
  const [result] = await pool.execute(`UPDATE medias SET ${fields.join(", ")}, updated_at = NOW() WHERE id = ?`, values);

  if (!result.affectedRows) {
    return res.status(404).json({ message: "Media not found" });
  }

  const [rows] = await pool.execute(
    `SELECT m.id, m.category_id, m.type, m.image, m.title, m.published_date, m.publisher_name, m.description, m.created_at, m.updated_at, m.status,
            c.category_name
       FROM medias m
       LEFT JOIN categories c ON c.id = m.category_id
      WHERE m.id = ?
      LIMIT 1`,
    [Number(id)],
  );

  return res.json(mapMedia(rows[0]));
}

async function deleteMedia(req, res) {
  const pool = getMySqlPool();
  const [result] = await pool.execute("DELETE FROM medias WHERE id = ?", [Number(req.params.id)]);

  if (!result.affectedRows) {
    return res.status(404).json({ message: "Media not found" });
  }

  return res.json({ message: "Media deleted" });
}

module.exports = { listMedias, uploadMediaImageHandler, createMedia, updateMedia, deleteMedia };
