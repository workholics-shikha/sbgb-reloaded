const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { getMySqlPool } = require("../config/mysql");

const PATRIKA_UPLOAD_DIR = path.join(process.cwd(), "uploads", "patrika");

fs.mkdirSync(PATRIKA_UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, PATRIKA_UPLOAD_DIR),
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname || "").toLowerCase() || ".pdf";
    const basename = path
      .basename(file.originalname || "patrika-file", extension)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40);

    cb(null, `${Date.now()}-${basename || "patrika-file"}${extension}`);
  },
});

const uploadPatrikaFile = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

function mapPatrika(row) {
  return {
    id: String(row.id),
    patrika_name: row.patrika_name || "",
    patrika_year: row.patrika_year || "",
    patrika_file: row.patrika_file || "",
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

function uploadPatrikaFileHandler(req, res) {
  uploadPatrikaFile.single("file")(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "File must be 10MB or smaller" });
      }

      return res.status(400).json({ message: error.message || "Unable to upload file" });
    }

    if (error) {
      return res.status(400).json({ message: error.message || "Unable to upload file" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    return res.status(201).json({
      file: `/uploads/patrika/${req.file.filename}`,
      filename: req.file.filename,
    });
  });
}

async function listPatrika(req, res) {
  const pool = getMySqlPool();
  const [rows] = await pool.execute(
    "SELECT id, patrika_name, patrika_year, patrika_file, created_at, updated_at, status FROM patrika ORDER BY id DESC",
  );

  return res.json(rows.map(mapPatrika));
}

async function createPatrika(req, res) {
  const { patrika_name, patrika_year, patrika_file, status } = req.body || {};
  const normalizedName = String(patrika_name || "").trim();
  const normalizedYear = String(patrika_year || "").trim();
  const normalizedFile = String(patrika_file || "").trim();
  const normalizedStatus = normalizeStatus(status);

  if (!normalizedName) return res.status(400).json({ message: "Name is required" });
  if (!normalizedYear) return res.status(400).json({ message: "Year is required" });
  if (!normalizedFile) return res.status(400).json({ message: "File is required" });
  if (normalizedStatus == null) return res.status(400).json({ message: "Status is required" });

  const pool = getMySqlPool();
  const [result] = await pool.execute(
    "INSERT INTO patrika (patrika_name, patrika_year, patrika_file, created_at, updated_at, status) VALUES (?, ?, ?, NOW(), NOW(), ?)",
    [normalizedName, normalizedYear, normalizedFile, normalizedStatus],
  );

  const [rows] = await pool.execute(
    "SELECT id, patrika_name, patrika_year, patrika_file, created_at, updated_at, status FROM patrika WHERE id = ? LIMIT 1",
    [result.insertId],
  );

  return res.status(201).json(mapPatrika(rows[0]));
}

async function updatePatrika(req, res) {
  const { id } = req.params;
  const { patrika_name, patrika_year, patrika_file, status } = req.body || {};
  const fields = [];
  const values = [];

  if (patrika_name !== undefined) {
    const normalizedName = String(patrika_name).trim();
    if (!normalizedName) return res.status(400).json({ message: "Name is required" });
    fields.push("patrika_name = ?");
    values.push(normalizedName);
  }

  if (patrika_year !== undefined) {
    const normalizedYear = String(patrika_year).trim();
    if (!normalizedYear) return res.status(400).json({ message: "Year is required" });
    fields.push("patrika_year = ?");
    values.push(normalizedYear);
  }

  if (patrika_file !== undefined) {
    const normalizedFile = String(patrika_file).trim();
    if (!normalizedFile) return res.status(400).json({ message: "File is required" });
    fields.push("patrika_file = ?");
    values.push(normalizedFile);
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
    `UPDATE patrika SET ${fields.join(", ")}, updated_at = NOW() WHERE id = ?`,
    values,
  );

  if (!result.affectedRows) {
    return res.status(404).json({ message: "Patrika not found" });
  }

  const [rows] = await pool.execute(
    "SELECT id, patrika_name, patrika_year, patrika_file, created_at, updated_at, status FROM patrika WHERE id = ? LIMIT 1",
    [Number(id)],
  );

  return res.json(mapPatrika(rows[0]));
}

async function deletePatrika(req, res) {
  const pool = getMySqlPool();
  const [result] = await pool.execute("DELETE FROM patrika WHERE id = ?", [Number(req.params.id)]);

  if (!result.affectedRows) {
    return res.status(404).json({ message: "Patrika not found" });
  }

  return res.json({ message: "Patrika deleted" });
}

module.exports = {
  listPatrika,
  uploadPatrikaFileHandler,
  createPatrika,
  updatePatrika,
  deletePatrika,
};
