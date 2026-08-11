const { getMySqlPool } = require("../config/mysql");

function mapCity(row) {
  return {
    id: String(row.id),
    city_name: row.city_name || "",
    state_id: row.state_id != null ? String(row.state_id) : "",
    state_name: row.state_name || "",
    event_id: row.event_id || "",
    testimonial_counter: Number(row.testimonial_counter || 0),
  };
}

async function listCities(req, res) {
  const pool = getMySqlPool();
  const [rows] = await pool.execute(
    `SELECT c.id, c.city_name, c.state_id, c.event_id, c.testimonial_counter, s.name AS state_name
       FROM cities c
       LEFT JOIN states s ON s.id = c.state_id
      ORDER BY c.city_name ASC`,
  );
  return res.json(rows.map(mapCity));
}

async function createCity(req, res) {
  const { city_name, state_id, event_id, testimonial_counter } = req.body || {};
  const normalizedCityName = String(city_name || "").trim();
  const normalizedStateId = Number(state_id);
  const normalizedEventId = String(event_id || "").trim();
  const normalizedCounter = Number(testimonial_counter || 0);

  if (!normalizedCityName) return res.status(400).json({ message: "City name is required" });
  if (!Number.isInteger(normalizedStateId) || normalizedStateId <= 0) {
    return res.status(400).json({ message: "State is required" });
  }

  const pool = getMySqlPool();
  const [result] = await pool.execute(
    "INSERT INTO cities (city_name, state_id, event_id, testimonial_counter) VALUES (?, ?, ?, ?)",
    [normalizedCityName, normalizedStateId, normalizedEventId, normalizedCounter],
  );

  const [rows] = await pool.execute(
    `SELECT c.id, c.city_name, c.state_id, c.event_id, c.testimonial_counter, s.name AS state_name
       FROM cities c
       LEFT JOIN states s ON s.id = c.state_id
      WHERE c.id = ?
      LIMIT 1`,
    [result.insertId],
  );

  return res.status(201).json(mapCity(rows[0]));
}

async function updateCity(req, res) {
  const { id } = req.params;
  const { city_name, state_id, event_id, testimonial_counter } = req.body || {};
  const fields = [];
  const values = [];

  if (city_name !== undefined) {
    const normalizedCityName = String(city_name).trim();
    if (!normalizedCityName) return res.status(400).json({ message: "City name is required" });
    fields.push("city_name = ?");
    values.push(normalizedCityName);
  }

  if (state_id !== undefined) {
    const normalizedStateId = Number(state_id);
    if (!Number.isInteger(normalizedStateId) || normalizedStateId <= 0) {
      return res.status(400).json({ message: "State is required" });
    }
    fields.push("state_id = ?");
    values.push(normalizedStateId);
  }

  if (event_id !== undefined) {
    fields.push("event_id = ?");
    values.push(String(event_id).trim());
  }

  if (testimonial_counter !== undefined) {
    fields.push("testimonial_counter = ?");
    values.push(Number(testimonial_counter || 0));
  }

  if (!fields.length) {
    return res.status(400).json({ message: "No valid fields to update" });
  }

  const pool = getMySqlPool();
  values.push(Number(id));
  const [result] = await pool.execute(`UPDATE cities SET ${fields.join(", ")} WHERE id = ?`, values);
  if (!result.affectedRows) {
    return res.status(404).json({ message: "City not found" });
  }

  const [rows] = await pool.execute(
    `SELECT c.id, c.city_name, c.state_id, c.event_id, c.testimonial_counter, s.name AS state_name
       FROM cities c
       LEFT JOIN states s ON s.id = c.state_id
      WHERE c.id = ?
      LIMIT 1`,
    [Number(id)],
  );

  return res.json(mapCity(rows[0]));
}

async function deleteCity(req, res) {
  const pool = getMySqlPool();
  const [result] = await pool.execute("DELETE FROM cities WHERE id = ?", [Number(req.params.id)]);
  if (!result.affectedRows) {
    return res.status(404).json({ message: "City not found" });
  }
  return res.json({ message: "City deleted" });
}

module.exports = { listCities, createCity, updateCity, deleteCity };
