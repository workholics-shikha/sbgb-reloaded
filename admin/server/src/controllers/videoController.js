const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { getMySqlPool } = require("../config/mysql");

const VIDEO_UPLOAD_DIR = path.join(process.cwd(), "uploads", "videos");

fs.mkdirSync(VIDEO_UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, VIDEO_UPLOAD_DIR),
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname || "").toLowerCase() || ".png";
    const basename = path
      .basename(file.originalname || "video-image", extension)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40);

    cb(null, `${Date.now()}-${basename || "video-image"}${extension}`);
  },
});

const uploadVideoImage = multer({
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

function mapVideo(row) {
  return {
    id: String(row.id),
    title: row.title || "",
    image: row.image || "",
    video_link: row.video_link || "",
    video_id: row.video_id || "",
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

function uploadVideoImageHandler(req, res) {
  uploadVideoImage.single("image")(req, res, (error) => {
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
      image: `/uploads/videos/${req.file.filename}`,
      filename: req.file.filename,
    });
  });
}

async function listVideos(req, res) {
  const pool = getMySqlPool();
  const [rows] = await pool.execute(
    "SELECT id, title, image, video_link, video_id, description, created_at, updated_at, status FROM videos ORDER BY id DESC",
  );
  return res.json(rows.map(mapVideo));
}

async function createVideo(req, res) {
  const { title, image, video_link, video_id, description, status } = req.body || {};
  const normalizedTitle = String(title || "").trim();
  const normalizedImage = String(image || "").trim();
  const normalizedVideoLink = String(video_link || "").trim();
  const normalizedVideoId = String(video_id || "").trim();
  const normalizedDescription = String(description || "").trim();
  const normalizedStatus = normalizeStatus(status);

  if (!normalizedTitle) return res.status(400).json({ message: "Title is required" });
  if (!normalizedImage) return res.status(400).json({ message: "Image is required" });
  if (!normalizedVideoLink) return res.status(400).json({ message: "Video link is required" });
  if (normalizedStatus == null) return res.status(400).json({ message: "Status is required" });

  const pool = getMySqlPool();
  const [result] = await pool.execute(
    "INSERT INTO videos (title, image, video_link, video_id, description, created_at, updated_at, status) VALUES (?, ?, ?, ?, ?, NOW(), NOW(), ?)",
    [normalizedTitle, normalizedImage, normalizedVideoLink, normalizedVideoId, normalizedDescription, normalizedStatus],
  );

  const [rows] = await pool.execute(
    "SELECT id, title, image, video_link, video_id, description, created_at, updated_at, status FROM videos WHERE id = ? LIMIT 1",
    [result.insertId],
  );

  return res.status(201).json(mapVideo(rows[0]));
}

async function updateVideo(req, res) {
  const { id } = req.params;
  const { title, image, video_link, video_id, description, status } = req.body || {};
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
  if (video_link !== undefined) {
    const normalizedVideoLink = String(video_link).trim();
    if (!normalizedVideoLink) return res.status(400).json({ message: "Video link is required" });
    fields.push("video_link = ?");
    values.push(normalizedVideoLink);
  }
  if (video_id !== undefined) {
    fields.push("video_id = ?");
    values.push(String(video_id).trim());
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
  const [result] = await pool.execute(`UPDATE videos SET ${fields.join(", ")}, updated_at = NOW() WHERE id = ?`, values);

  if (!result.affectedRows) {
    return res.status(404).json({ message: "Video not found" });
  }

  const [rows] = await pool.execute(
    "SELECT id, title, image, video_link, video_id, description, created_at, updated_at, status FROM videos WHERE id = ? LIMIT 1",
    [Number(id)],
  );

  return res.json(mapVideo(rows[0]));
}

async function deleteVideo(req, res) {
  const pool = getMySqlPool();
  const [result] = await pool.execute("DELETE FROM videos WHERE id = ?", [Number(req.params.id)]);
  if (!result.affectedRows) {
    return res.status(404).json({ message: "Video not found" });
  }

  return res.json({ message: "Video deleted" });
}

module.exports = { listVideos, uploadVideoImageHandler, createVideo, updateVideo, deleteVideo };
