const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { getMySqlPool } = require("../config/mysql");

const STORY_UPLOAD_DIR = path.join(process.cwd(), "uploads", "stories");

fs.mkdirSync(STORY_UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, STORY_UPLOAD_DIR),
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname || "").toLowerCase() || ".png";
    const basename = path
      .basename(file.originalname || "story-image", extension)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40);

    cb(null, `${Date.now()}-${basename || "story-image"}${extension}`);
  },
});

const uploadStoryImage = multer({
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

function mapStory(row) {
  return {
    id: String(row.id),
    title: row.title || "",
    image: row.image || "",
    story_place: row.story_place || "",
    story_date: row.story_date || "",
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

function uploadStoryImageHandler(req, res) {
  uploadStoryImage.single("image")(req, res, (error) => {
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
      image: `/uploads/stories/${req.file.filename}`,
      filename: req.file.filename,
    });
  });
}

async function listStories(req, res) {
  const pool = getMySqlPool();
  const [rows] = await pool.execute(
    "SELECT id, title, image, story_place, story_date, description, created_at, updated_at, status FROM stories ORDER BY id DESC",
  );
  return res.json(rows.map(mapStory));
}

async function createStory(req, res) {
  const { title, image, story_place, story_date, description, status } = req.body || {};
  const normalizedTitle = String(title || "").trim();
  const normalizedImage = String(image || "").trim();
  const normalizedPlace = String(story_place || "").trim();
  const normalizedDate = String(story_date || "").trim();
  const normalizedDescription = String(description || "").trim();
  const normalizedStatus = normalizeStatus(status);

  if (!normalizedTitle) return res.status(400).json({ message: "Title is required" });
  if (!normalizedImage) return res.status(400).json({ message: "Image is required" });
  if (!normalizedPlace) return res.status(400).json({ message: "Place is required" });
  if (!normalizedDate) return res.status(400).json({ message: "Date is required" });
  if (!normalizedDescription) return res.status(400).json({ message: "Description is required" });
  if (normalizedStatus == null) return res.status(400).json({ message: "Status is required" });

  const pool = getMySqlPool();
  const [result] = await pool.execute(
    "INSERT INTO stories (title, image, story_place, story_date, description, created_at, updated_at, status) VALUES (?, ?, ?, ?, ?, NOW(), NOW(), ?)",
    [normalizedTitle, normalizedImage, normalizedPlace, normalizedDate, normalizedDescription, normalizedStatus],
  );

  const [rows] = await pool.execute(
    "SELECT id, title, image, story_place, story_date, description, created_at, updated_at, status FROM stories WHERE id = ? LIMIT 1",
    [result.insertId],
  );

  return res.status(201).json(mapStory(rows[0]));
}

async function updateStory(req, res) {
  const { id } = req.params;
  const { title, image, story_place, story_date, description, status } = req.body || {};
  const fields = [];
  const values = [];

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
  if (story_place !== undefined) {
    const normalizedPlace = String(story_place).trim();
    if (!normalizedPlace) return res.status(400).json({ message: "Place is required" });
    fields.push("story_place = ?");
    values.push(normalizedPlace);
  }
  if (story_date !== undefined) {
    const normalizedDate = String(story_date).trim();
    if (!normalizedDate) return res.status(400).json({ message: "Date is required" });
    fields.push("story_date = ?");
    values.push(normalizedDate);
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
  const [result] = await pool.execute(`UPDATE stories SET ${fields.join(", ")}, updated_at = NOW() WHERE id = ?`, values);

  if (!result.affectedRows) {
    return res.status(404).json({ message: "Story not found" });
  }

  const [rows] = await pool.execute(
    "SELECT id, title, image, story_place, story_date, description, created_at, updated_at, status FROM stories WHERE id = ? LIMIT 1",
    [Number(id)],
  );

  return res.json(mapStory(rows[0]));
}

async function deleteStory(req, res) {
  const pool = getMySqlPool();
  const [result] = await pool.execute("DELETE FROM stories WHERE id = ?", [Number(req.params.id)]);
  if (!result.affectedRows) {
    return res.status(404).json({ message: "Story not found" });
  }
  return res.json({ message: "Story deleted" });
}

module.exports = { listStories, uploadStoryImageHandler, createStory, updateStory, deleteStory };
