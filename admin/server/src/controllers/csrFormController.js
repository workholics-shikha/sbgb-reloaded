const { getMySqlPool } = require("../config/mysql");

function mapCsrForm(row) {
  return {
    id: String(row.id),
    company_name: row.name_of_company || "",
    concern_person: row.name_of_concern_person || "",
    mobile: row.mobile || "",
    email: row.email || "",
    city: row.city || "",
    tehsil_block: row.tehsil_block || "",
    district: row.district || "",
    state: row.state || "",
    status: row.status != null ? Number(row.status) : 1,
    created_at: row.created_at ? new Date(row.created_at).toISOString() : "",
    updated_at: row.updated_at ? new Date(row.updated_at).toISOString() : "",
  };
}

async function listCsrForms(req, res) {
  const pool = getMySqlPool();
  const [rows] = await pool.execute(
    `SELECT id, name_of_company, name_of_concern_person, mobile, email, city, tehsil_block, district, state, created_at, updated_at, status
       FROM csr_forms
      ORDER BY id DESC`,
  );

  return res.json(rows.map(mapCsrForm));
}

async function createCsrForm(req, res) {
  const {
    company_name,
    name_of_company,
    concern_person,
    name_of_concern_person,
    mobile,
    email,
    city,
    tehsil_block,
    district,
    state,
  } = req.body || {};

  const normalizedCompanyName = String(name_of_company ?? company_name ?? "").trim();
  const normalizedConcernPerson = String(name_of_concern_person ?? concern_person ?? "").trim();
  const normalizedMobile = String(mobile || "").trim();
  const normalizedEmail = String(email || "").trim();
  const normalizedCity = String(city || "").trim();
  const normalizedTehsilBlock = String(tehsil_block || "").trim();
  const normalizedDistrict = String(district || "").trim();
  const normalizedState = String(state || "").trim();

  if (!normalizedCompanyName) {
    return res.status(400).json({ message: "Company name is required" });
  }

  if (!normalizedConcernPerson) {
    return res.status(400).json({ message: "Concern person is required" });
  }

  if (!normalizedMobile) {
    return res.status(400).json({ message: "Mobile number is required" });
  }

  if (!normalizedEmail) {
    return res.status(400).json({ message: "Email is required" });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(normalizedEmail)) {
    return res.status(400).json({ message: "Valid email is required" });
  }

  if (!normalizedCity || !normalizedTehsilBlock || !normalizedDistrict || !normalizedState) {
    return res.status(400).json({ message: "City, tehsil/block, district, and state are required" });
  }

  const pool = getMySqlPool();
  const [result] = await pool.execute(
    `INSERT INTO csr_forms
      (name_of_company, name_of_concern_person, mobile, email, city, tehsil_block, district, state)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      normalizedCompanyName,
      normalizedConcernPerson,
      normalizedMobile,
      normalizedEmail,
      normalizedCity,
      normalizedTehsilBlock,
      normalizedDistrict,
      normalizedState,
    ],
  );

  const [rows] = await pool.execute(
    `SELECT id, name_of_company, name_of_concern_person, mobile, email, city, tehsil_block, district, state, created_at, updated_at, status
       FROM csr_forms
      WHERE id = ?
      LIMIT 1`,
    [result.insertId],
  );

  return res.status(201).json(mapCsrForm(rows[0]));
}

module.exports = { listCsrForms, createCsrForm };
