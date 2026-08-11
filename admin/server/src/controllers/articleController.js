const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { getMySqlPool } = require("../config/mysql");

const ARTICLE_UPLOAD_DIR = path.join(process.cwd(), "uploads", "articles");

fs.mkdirSync(ARTICLE_UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, ARTICLE_UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname || "").toLowerCase() || ".png";
    const basename = path
      .basename(file.originalname || "article-image", extension)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40);

    cb(null, `${Date.now()}-${basename || "article-image"}${extension}`);
  },
});

const uploadArticleImage = multer({
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

function mapArticle(row) {
  return {
    id: String(row.id),
    category_id: row.category_id != null ? String(row.category_id) : "",
    category: row.category || "",
    title: row.title || "",
    image: row.image || "",
    article_date: row.article_date || "",
    article_owner: row.article_owner || "",
    description: row.description || "",
    status: Number(row.status) === 1 ? 1 : 0,
    is_published: Number(row.status) === 1,
    created_at: row.created_at ? new Date(row.created_at).toISOString() : "",
    updated_at: row.updated_at ? new Date(row.updated_at).toISOString() : null,
  };
}

function normalizeStatus(value) {
  if (value === true || value === "1" || value === 1) return 1;
  if (value === false || value === "0" || value === 0) return 0;
  return null;
}

function uploadArticleImageHandler(req, res) {
  uploadArticleImage.single("image")(req, res, (error) => {
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
      image: `/uploads/articles/${req.file.filename}`,
      filename: req.file.filename,
    });
  });
}

async function listArticles(req, res) {
  const pool = getMySqlPool();
  const [rows] = await pool.execute(
    "SELECT id, category_id, category, title, image, article_date, article_owner, description, created_at, updated_at, status FROM articles ORDER BY id DESC",
  );

  return res.json(rows.map(mapArticle));
}

async function createArticle(req, res) {
  const { category_id, category, title, image, article_date, article_owner, description, status } = req.body || {};
  const normalizedCategoryId = Number(category_id);
  const normalizedCategory = String(category || "").trim();
  const normalizedTitle = String(title || "").trim();
  const normalizedImage = String(image || "").trim();
  const normalizedArticleDate = String(article_date || "").trim();
  const normalizedArticleOwner = String(article_owner || "").trim();
  const normalizedDescription = String(description || "").trim();
  const normalizedStatus = normalizeStatus(status);

  if (!Number.isInteger(normalizedCategoryId) || normalizedCategoryId <= 0) {
    return res.status(400).json({ message: "Category is required" });
  }
  if (!normalizedTitle) return res.status(400).json({ message: "Title is required" });
  if (!normalizedImage) return res.status(400).json({ message: "Image is required" });
  if (!normalizedArticleDate) return res.status(400).json({ message: "Article date is required" });
  if (!normalizedArticleOwner) return res.status(400).json({ message: "Article owner is required" });
  if (!normalizedDescription) return res.status(400).json({ message: "Description is required" });
  if (normalizedStatus == null) return res.status(400).json({ message: "Status is required" });

  const pool = getMySqlPool();
  const [result] = await pool.execute(
    "INSERT INTO articles (category_id, category, title, image, article_date, article_owner, description, created_at, updated_at, status) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?)",
    [
      normalizedCategoryId,
      normalizedCategory,
      normalizedTitle,
      normalizedImage,
      normalizedArticleDate,
      normalizedArticleOwner,
      normalizedDescription,
      normalizedStatus,
    ],
  );

  const [rows] = await pool.execute(
    "SELECT id, category_id, category, title, image, article_date, article_owner, description, created_at, updated_at, status FROM articles WHERE id = ? LIMIT 1",
    [result.insertId],
  );

  return res.status(201).json(mapArticle(rows[0]));
}

async function updateArticle(req, res) {
  const { id } = req.params;
  const { category_id, category, title, image, article_date, article_owner, description, status } = req.body || {};
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

  if (category !== undefined) {
    fields.push("category = ?");
    values.push(String(category).trim());
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

  if (article_date !== undefined) {
    const normalizedArticleDate = String(article_date).trim();
    if (!normalizedArticleDate) return res.status(400).json({ message: "Article date is required" });
    fields.push("article_date = ?");
    values.push(normalizedArticleDate);
  }

  if (article_owner !== undefined) {
    const normalizedArticleOwner = String(article_owner).trim();
    if (!normalizedArticleOwner) return res.status(400).json({ message: "Article owner is required" });
    fields.push("article_owner = ?");
    values.push(normalizedArticleOwner);
  }

  if (description !== undefined) {
    const normalizedDescription = String(description).trim();
    if (!normalizedDescription) return res.status(400).json({ message: "Description is required" });
    fields.push("description = ?");
    values.push(normalizedDescription);
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
    `UPDATE articles SET ${fields.join(", ")}, updated_at = NOW() WHERE id = ?`,
    values,
  );

  if (!result.affectedRows) {
    return res.status(404).json({ message: "Article not found" });
  }

  const [rows] = await pool.execute(
    "SELECT id, category_id, category, title, image, article_date, article_owner, description, created_at, updated_at, status FROM articles WHERE id = ? LIMIT 1",
    [Number(id)],
  );

  return res.json(mapArticle(rows[0]));
}

async function deleteArticle(req, res) {
  const pool = getMySqlPool();
  const [result] = await pool.execute("DELETE FROM articles WHERE id = ?", [Number(req.params.id)]);

  if (!result.affectedRows) {
    return res.status(404).json({ message: "Article not found" });
  }

  return res.json({ message: "Article deleted" });
}

module.exports = {
  listArticles,
  uploadArticleImageHandler,
  createArticle,
  updateArticle,
  deleteArticle,
};
