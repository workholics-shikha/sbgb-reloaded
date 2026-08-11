const { getMySqlPool } = require("../config/mysql");

function mapCategory(row) {
  return {
    id: String(row.id),
    name: row.category_name || "",
    type: row.type || "",
    status: Number(row.status) === 1 ? "active" : "inactive",
    is_active: Number(row.status) === 1,
    created_at: row.created_at ? new Date(row.created_at).toISOString() : "",
    updated_at: row.updated_at ? new Date(row.updated_at).toISOString() : null,
  };
}

function normalizeStatus(value) {
  if (value === true || value === 1 || value === "1" || String(value || "").toLowerCase() === "active") {
    return 1;
  }

  if (value === false || value === 0 || value === "0" || String(value || "").toLowerCase() === "inactive") {
    return 0;
  }

  return null;
}

async function listCategories(req, res) {
  const pool = getMySqlPool();
  const [rows] = await pool.execute(
    "SELECT id, type, category_name, created_at, updated_at, status FROM categories ORDER BY id DESC",
  );

  return res.json(rows.map(mapCategory));
}

async function createCategory(req, res) {
  const { name, type, status } = req.body || {};
  const normalizedName = String(name || "").trim();
  const normalizedType = String(type || "").trim().toLowerCase();
  const normalizedStatus = normalizeStatus(status ?? "active");

  if (!normalizedName) return res.status(400).json({ message: "Category name is required" });
  if (!normalizedType) return res.status(400).json({ message: "Category type is required" });
  if (normalizedStatus == null) return res.status(400).json({ message: "Category status is required" });

  const pool = getMySqlPool();
  const [result] = await pool.execute(
    "INSERT INTO categories (type, category_name, created_at, updated_at, status) VALUES (?, ?, NOW(), NOW(), ?)",
    [normalizedType, normalizedName, normalizedStatus],
  );

  const [rows] = await pool.execute(
    "SELECT id, type, category_name, created_at, updated_at, status FROM categories WHERE id = ? LIMIT 1",
    [result.insertId],
  );

  return res.status(201).json(mapCategory(rows[0]));
}

async function updateCategory(req, res) {
  const { id } = req.params;
  const { name, type, status } = req.body || {};
  const fields = [];
  const values = [];

  if (name !== undefined) {
    const normalizedName = String(name).trim();
    if (!normalizedName) return res.status(400).json({ message: "Category name is required" });
    fields.push("category_name = ?");
    values.push(normalizedName);
  }

  if (type !== undefined) {
    const normalizedType = String(type).trim().toLowerCase();
    if (!normalizedType) return res.status(400).json({ message: "Invalid category type" });
    fields.push("type = ?");
    values.push(normalizedType);
  }

  if (status !== undefined) {
    const normalizedStatus = normalizeStatus(status);
    if (normalizedStatus == null) return res.status(400).json({ message: "Invalid category status" });
    fields.push("status = ?");
    values.push(normalizedStatus);
  }

  if (fields.length === 0) {
    return res.status(400).json({ message: "No valid fields to update" });
  }

  const pool = getMySqlPool();
  values.push(Number(id));

  const [result] = await pool.execute(
    `UPDATE categories SET ${fields.join(", ")}, updated_at = NOW() WHERE id = ?`,
    values,
  );

  if (!result.affectedRows) return res.status(404).json({ message: "Category not found" });

  const [rows] = await pool.execute(
    "SELECT id, type, category_name, created_at, updated_at, status FROM categories WHERE id = ? LIMIT 1",
    [Number(id)],
  );

  return res.json(mapCategory(rows[0]));
}

async function deleteCategory(req, res) {
  const pool = getMySqlPool();
  const [result] = await pool.execute("DELETE FROM categories WHERE id = ?", [Number(req.params.id)]);
  if (!result.affectedRows) return res.status(404).json({ message: "Category not found" });
  return res.json({ message: "Category deleted" });
}

module.exports = { listCategories, createCategory, updateCategory, deleteCategory };
