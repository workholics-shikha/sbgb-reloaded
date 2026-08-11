const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { getMySqlPool } = require("../config/mysql");

const COACHING_UPLOAD_DIR = path.join(process.cwd(), "uploads", "coaching-organizations");

fs.mkdirSync(COACHING_UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, COACHING_UPLOAD_DIR),
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname || "").toLowerCase() || ".png";
    const basename = path
      .basename(file.originalname || "organization-image", extension)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40);

    cb(null, `${Date.now()}-${basename || "organization-image"}${extension}`);
  },
});

const uploadOrganizationImage = multer({
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

function normalizeStatus(value) {
  if (value === true || value === "1" || value === 1) return 1;
  if (value === false || value === "0" || value === 0) return 0;
  return null;
}

function mapOrganization(row) {
  return {
    id: String(row.id),
    name: row.name || "",
    slug: row.slug || "",
    image: row.image || "",
    updated_at: row.updated_at ? new Date(row.updated_at).toISOString() : null,
    status: Number(row.status) === 1 ? 1 : 0,
    is_active: Number(row.status) === 1,
    created_at: row.created_at ? new Date(row.created_at).toISOString() : "",
  };
}

function uploadCoachingOrganizationImageHandler(req, res) {
  uploadOrganizationImage.single("image")(req, res, (error) => {
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
      image: `/uploads/coaching-organizations/${req.file.filename}`,
      filename: req.file.filename,
    });
  });
}

async function listCoachingOrganizations(req, res) {
  const pool = getMySqlPool();
  const [rows] = await pool.execute(
    "SELECT id, name, slug, image, status, created_at, updated_at FROM coaching_organizations ORDER BY id ASC",
  );
  return res.json(rows.map(mapOrganization));
}

async function createCoachingOrganization(req, res) {
  const { name, slug, image, status } = req.body || {};
  const normalizedName = String(name || "").trim();
  const normalizedSlug = String(slug || "").trim();
  const normalizedImage = String(image || "").trim();
  const normalizedStatus = normalizeStatus(status);

  if (!normalizedName) return res.status(400).json({ message: "Organization name is required" });
  if (!normalizedImage) return res.status(400).json({ message: "Image is required" });
  if (normalizedStatus == null) return res.status(400).json({ message: "Status is required" });

  const pool = getMySqlPool();
  const [result] = await pool.execute(
    "INSERT INTO coaching_organizations (name, slug, image, status, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())",
    [normalizedName, normalizedSlug, normalizedImage, normalizedStatus],
  );

  const [rows] = await pool.execute(
    "SELECT id, name, slug, image, status, created_at, updated_at FROM coaching_organizations WHERE id = ? LIMIT 1",
    [result.insertId],
  );

  return res.status(201).json(mapOrganization(rows[0]));
}

async function updateCoachingOrganization(req, res) {
  const { id } = req.params;
  const { name, slug, image, status } = req.body || {};
  const fields = [];
  const values = [];

  if (name !== undefined) {
    const normalizedName = String(name).trim();
    if (!normalizedName) return res.status(400).json({ message: "Organization name is required" });
    fields.push("name = ?");
    values.push(normalizedName);
  }

  if (slug !== undefined) {
    fields.push("slug = ?");
    values.push(String(slug).trim());
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

  if (!fields.length) {
    return res.status(400).json({ message: "No valid fields to update" });
  }

  const pool = getMySqlPool();
  values.push(Number(id));
  const [result] = await pool.execute(
    `UPDATE coaching_organizations SET ${fields.join(", ")}, updated_at = NOW() WHERE id = ?`,
    values,
  );

  if (!result.affectedRows) {
    return res.status(404).json({ message: "Coaching organization not found" });
  }

  const [rows] = await pool.execute(
    "SELECT id, name, slug, image, status, created_at, updated_at FROM coaching_organizations WHERE id = ? LIMIT 1",
    [Number(id)],
  );

  return res.json(mapOrganization(rows[0]));
}

async function deleteCoachingOrganization(req, res) {
  const pool = getMySqlPool();
  const [result] = await pool.execute("DELETE FROM coaching_organizations WHERE id = ?", [Number(req.params.id)]);
  if (!result.affectedRows) {
    return res.status(404).json({ message: "Coaching organization not found" });
  }
  return res.json({ message: "Coaching organization deleted" });
}

module.exports = {
  listCoachingOrganizations,
  uploadCoachingOrganizationImageHandler,
  createCoachingOrganization,
  updateCoachingOrganization,
  deleteCoachingOrganization,
};
