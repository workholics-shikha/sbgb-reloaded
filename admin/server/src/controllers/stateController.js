const { getMySqlPool } = require("../config/mysql");

function mapState(row) {
  return {
    id: String(row.id),
    name: row.name || "",
    country_id: row.country_id != null ? String(row.country_id) : "",
    country_name: row.country_name || "India",
  };
}

async function listStates(req, res) {
  const pool = getMySqlPool();
  const [rows] = await pool.execute(
    `SELECT s.id, s.name, s.country_id, c.name AS country_name
       FROM states s
       LEFT JOIN countries c ON c.id = s.country_id
      ORDER BY s.id ASC`,
  );
  return res.json(rows.map(mapState));
}

async function createState(req, res) {
  const { name, country_id } = req.body || {};
  const normalizedName = String(name || "").trim();
  const normalizedCountryId = Number(country_id || 1);

  if (!normalizedName) {
    return res.status(400).json({ message: "State name is required" });
  }

  const pool = getMySqlPool();
  const [result] = await pool.execute("INSERT INTO states (name, country_id) VALUES (?, ?)", [
    normalizedName,
    normalizedCountryId,
  ]);
  const [rows] = await pool.execute(
    `SELECT s.id, s.name, s.country_id, c.name AS country_name
       FROM states s
       LEFT JOIN countries c ON c.id = s.country_id
      WHERE s.id = ?
      LIMIT 1`,
    [result.insertId],
  );

  return res.status(201).json(mapState(rows[0]));
}

async function updateState(req, res) {
  const { id } = req.params;
  const { name, country_id } = req.body || {};
  const fields = [];
  const values = [];

  if (name !== undefined) {
    const normalizedName = String(name).trim();
    if (!normalizedName) {
      return res.status(400).json({ message: "State name is required" });
    }
    fields.push("name = ?");
    values.push(normalizedName);
  }

  if (country_id !== undefined) {
    fields.push("country_id = ?");
    values.push(Number(country_id) || 1);
  }

  if (!fields.length) {
    return res.status(400).json({ message: "No valid fields to update" });
  }

  const pool = getMySqlPool();
  values.push(Number(id));
  const [result] = await pool.execute(`UPDATE states SET ${fields.join(", ")} WHERE id = ?`, values);

  if (!result.affectedRows) {
    return res.status(404).json({ message: "State not found" });
  }

  const [rows] = await pool.execute(
    `SELECT s.id, s.name, s.country_id, c.name AS country_name
       FROM states s
       LEFT JOIN countries c ON c.id = s.country_id
      WHERE s.id = ?
      LIMIT 1`,
    [Number(id)],
  );

  return res.json(mapState(rows[0]));
}

async function deleteState(req, res) {
  const pool = getMySqlPool();
  const [result] = await pool.execute("DELETE FROM states WHERE id = ?", [Number(req.params.id)]);
  if (!result.affectedRows) {
    return res.status(404).json({ message: "State not found" });
  }
  return res.json({ message: "State deleted" });
}

module.exports = { listStates, createState, updateState, deleteState };
