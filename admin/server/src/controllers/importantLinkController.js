const { getMySqlPool } = require("../config/mysql");

function mapImportantLink(row) {
  return {
    id: String(row.id),
    links: row.links || "",
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

async function listImportantLinks(req, res) {
  const pool = getMySqlPool();
  const [rows] = await pool.execute("SELECT id, links, created_at, updated_at, status FROM important_links ORDER BY id DESC");
  return res.json(rows.map(mapImportantLink));
}

async function createImportantLink(req, res) {
  const { links, status } = req.body || {};
  const normalizedLinks = String(links || "").trim();
  const normalizedStatus = normalizeStatus(status);

  if (!normalizedLinks) return res.status(400).json({ message: "Link is required" });
  if (normalizedStatus == null) return res.status(400).json({ message: "Status is required" });

  const pool = getMySqlPool();
  const [result] = await pool.execute(
    "INSERT INTO important_links (links, created_at, updated_at, status) VALUES (?, NOW(), NOW(), ?)",
    [normalizedLinks, normalizedStatus],
  );

  const [rows] = await pool.execute("SELECT id, links, created_at, updated_at, status FROM important_links WHERE id = ? LIMIT 1", [result.insertId]);
  return res.status(201).json(mapImportantLink(rows[0]));
}

async function updateImportantLink(req, res) {
  const { id } = req.params;
  const { links, status } = req.body || {};
  const fields = [];
  const values = [];

  if (links !== undefined) {
    const normalizedLinks = String(links).trim();
    if (!normalizedLinks) return res.status(400).json({ message: "Link is required" });
    fields.push("links = ?");
    values.push(normalizedLinks);
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
  const [result] = await pool.execute(`UPDATE important_links SET ${fields.join(", ")}, updated_at = NOW() WHERE id = ?`, values);
  if (!result.affectedRows) {
    return res.status(404).json({ message: "Important link not found" });
  }

  const [rows] = await pool.execute("SELECT id, links, created_at, updated_at, status FROM important_links WHERE id = ? LIMIT 1", [Number(id)]);
  return res.json(mapImportantLink(rows[0]));
}

async function deleteImportantLink(req, res) {
  const pool = getMySqlPool();
  const [result] = await pool.execute("DELETE FROM important_links WHERE id = ?", [Number(req.params.id)]);
  if (!result.affectedRows) {
    return res.status(404).json({ message: "Important link not found" });
  }

  return res.json({ message: "Important link deleted" });
}

module.exports = { listImportantLinks, createImportantLink, updateImportantLink, deleteImportantLink };
