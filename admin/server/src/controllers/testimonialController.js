const { getMySqlPool } = require("../config/mysql");

function mapTestimonial(row) {
  return {
    id: String(row.id),
    name: row.name || "",
    email: row.email || "",
    place: row.place || "",
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

async function listTestimonials(req, res) {
  const pool = getMySqlPool();
  const [rows] = await pool.execute(
    "SELECT id, name, email, place, description, created_at, updated_at, status FROM testimonials ORDER BY id DESC",
  );
  return res.json(rows.map(mapTestimonial));
}

async function createTestimonial(req, res) {
  const { name, email, place, description, status } = req.body || {};
  const normalizedName = String(name || "").trim();
  const normalizedEmail = String(email || "").trim();
  const normalizedPlace = String(place || "").trim();
  const normalizedDescription = String(description || "").trim();
  const normalizedStatus = normalizeStatus(status);

  if (!normalizedName) return res.status(400).json({ message: "Name is required" });
  if (!normalizedDescription) return res.status(400).json({ message: "Description is required" });
  if (normalizedStatus == null) return res.status(400).json({ message: "Status is required" });

  const pool = getMySqlPool();
  const [result] = await pool.execute(
    "INSERT INTO testimonials (name, email, place, description, created_at, updated_at, status) VALUES (?, ?, ?, ?, NOW(), NOW(), ?)",
    [normalizedName, normalizedEmail, normalizedPlace, normalizedDescription, normalizedStatus],
  );

  const [rows] = await pool.execute(
    "SELECT id, name, email, place, description, created_at, updated_at, status FROM testimonials WHERE id = ? LIMIT 1",
    [result.insertId],
  );
  return res.status(201).json(mapTestimonial(rows[0]));
}

async function updateTestimonial(req, res) {
  const { id } = req.params;
  const { name, email, place, description, status } = req.body || {};
  const fields = [];
  const values = [];

  if (name !== undefined) {
    const normalizedName = String(name).trim();
    if (!normalizedName) return res.status(400).json({ message: "Name is required" });
    fields.push("name = ?");
    values.push(normalizedName);
  }
  if (email !== undefined) {
    fields.push("email = ?");
    values.push(String(email).trim());
  }
  if (place !== undefined) {
    fields.push("place = ?");
    values.push(String(place).trim());
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
  if (!fields.length) return res.status(400).json({ message: "No valid fields to update" });

  const pool = getMySqlPool();
  values.push(Number(id));
  const [result] = await pool.execute(`UPDATE testimonials SET ${fields.join(", ")}, updated_at = NOW() WHERE id = ?`, values);
  if (!result.affectedRows) return res.status(404).json({ message: "Testimonial not found" });

  const [rows] = await pool.execute(
    "SELECT id, name, email, place, description, created_at, updated_at, status FROM testimonials WHERE id = ? LIMIT 1",
    [Number(id)],
  );
  return res.json(mapTestimonial(rows[0]));
}

async function deleteTestimonial(req, res) {
  const pool = getMySqlPool();
  const [result] = await pool.execute("DELETE FROM testimonials WHERE id = ?", [Number(req.params.id)]);
  if (!result.affectedRows) return res.status(404).json({ message: "Testimonial not found" });
  return res.json({ message: "Testimonial deleted" });
}

module.exports = { listTestimonials, createTestimonial, updateTestimonial, deleteTestimonial };
