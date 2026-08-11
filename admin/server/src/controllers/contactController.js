const { getMySqlPool } = require("../config/mysql");

function mapContact(row) {
  return {
    id: String(row.id),
    name: row.name || "",
    email: row.email || "",
    mobile: row.mobile || "",
    comments: row.comments || "",
    subject: row.subject || "",
    state_id: row.state != null ? String(row.state) : "",
    state_name: row.state_name || "",
    city_id: row.city != null ? String(row.city) : "",
    city_name: row.city_name || "",
    address: row.address || "",
    created_at: row.created_date ? new Date(row.created_date).toISOString() : "",
  };
}

async function listContacts(req, res) {
  const pool = getMySqlPool();
  const [rows] = await pool.execute(
    `SELECT ct.id, ct.name, ct.email, ct.mobile, ct.comments, ct.subject, ct.state, ct.city, ct.address, ct.created_date,
            s.name AS state_name, c.city_name
       FROM contacts ct
       LEFT JOIN states s ON s.id = ct.state
       LEFT JOIN cities c ON c.id = ct.city
      ORDER BY ct.id DESC`,
  );
  return res.json(rows.map(mapContact));
}

async function createContact(req, res) {
  const {
    name,
    email,
    mobile,
    comments,
    message,
    subject,
    state,
    state_id,
    city,
    city_id,
    address,
  } = req.body || {};

  const normalizedName = String(name || "").trim();
  const normalizedEmail = String(email || "").trim();
  const normalizedSubject = String(subject || "").trim();
  const normalizedComments = String(message ?? comments ?? "").trim();
  const normalizedMobile = String(mobile || "").trim();
  const normalizedAddress = String(address || "").trim();
  const normalizedStateId = state_id || state ? Number(state_id || state) || null : null;
  const normalizedCityId = city_id || city ? Number(city_id || city) || null : null;

  if (!normalizedName) {
    return res.status(400).json({ message: "Name is required" });
  }

  if (!normalizedEmail) {
    return res.status(400).json({ message: "Email is required" });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(normalizedEmail)) {
    return res.status(400).json({ message: "Valid email is required" });
  }

  if (!normalizedSubject) {
    return res.status(400).json({ message: "Subject is required" });
  }

  if (!normalizedComments) {
    return res.status(400).json({ message: "Message is required" });
  }

  const pool = getMySqlPool();
  const [result] = await pool.execute(
    `INSERT INTO contacts (name, email, mobile, comments, subject, state, city, address)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      normalizedName,
      normalizedEmail,
      normalizedMobile,
      normalizedComments,
      normalizedSubject,
      normalizedStateId,
      normalizedCityId,
      normalizedAddress,
    ],
  );

  const [rows] = await pool.execute(
    `SELECT ct.id, ct.name, ct.email, ct.mobile, ct.comments, ct.subject, ct.state, ct.city, ct.address, ct.created_date,
            s.name AS state_name, c.city_name
       FROM contacts ct
       LEFT JOIN states s ON s.id = ct.state
       LEFT JOIN cities c ON c.id = ct.city
      WHERE ct.id = ?
      LIMIT 1`,
    [result.insertId],
  );

  return res.status(201).json(mapContact(rows[0]));
}

async function deleteContact(req, res) {
  const pool = getMySqlPool();
  const [result] = await pool.execute("DELETE FROM contacts WHERE id = ?", [Number(req.params.id)]);
  if (!result.affectedRows) {
    return res.status(404).json({ message: "Contact not found" });
  }
  return res.json({ message: "Contact deleted" });
}

module.exports = { listContacts, createContact, deleteContact };
