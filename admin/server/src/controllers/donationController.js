const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { getMySqlPool } = require("../config/mysql");

const DONATION_UPLOAD_DIR = path.join(process.cwd(), "uploads", "donations");
fs.mkdirSync(DONATION_UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, DONATION_UPLOAD_DIR),
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname || "").toLowerCase() || ".bin";
    const basename = path
      .basename(file.originalname || "donation-receipt", extension)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 50);

    cb(null, `${Date.now()}-${basename || "donation-receipt"}${extension}`);
  },
});

const uploadDonationReceipt = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      cb(new Error("Only JPG, PNG, or PDF files are allowed"));
      return;
    }
    cb(null, true);
  },
});

function buildOption(value, extra = {}) {
  return {
    id: String(value),
    label: String(value),
    value: String(value),
    ...extra,
  };
}

async function ensureDonationTable() {
  const pool = getMySqlPool();
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS donations (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      donor_name VARCHAR(255) NOT NULL,
      mobile VARCHAR(20) NOT NULL,
      email VARCHAR(255) NOT NULL,
      state_id INT NULL,
      state_name VARCHAR(255) NOT NULL,
      city_id INT NULL,
      city_name VARCHAR(255) NOT NULL,
      tehsil VARCHAR(255) NOT NULL,
      district VARCHAR(255) NOT NULL,
      payment_mode VARCHAR(50) NOT NULL,
      donation_amount DECIMAL(10,2) NOT NULL,
      donation_date DATE NOT NULL,
      purpose VARCHAR(255) NOT NULL,
      donor_identity VARCHAR(255) NOT NULL,
      payment_receipt VARCHAR(255) NOT NULL,
      status VARCHAR(30) NOT NULL DEFAULT 'pending',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
}

function mapDonation(row) {
  return {
    id: String(row.id),
    donor_name: row.donor_name || "",
    mobile: row.mobile || "",
    email: row.email || "",
    state_id: row.state_id != null ? String(row.state_id) : "",
    state_name: row.state_name || "",
    city_id: row.city_id != null ? String(row.city_id) : "",
    city_name: row.city_name || "",
    tehsil: row.tehsil || "",
    district: row.district || "",
    payment_mode: row.payment_mode || "",
    donation_amount: row.donation_amount != null ? Number(row.donation_amount) : null,
    donation_date: row.donation_date || "",
    purpose: row.purpose || "",
    donor_identity: row.donor_identity || "",
    payment_receipt: row.payment_receipt || "",
    status: row.status || "pending",
    created_at: row.created_at ? new Date(row.created_at).toISOString() : "",
    updated_at: row.updated_at ? new Date(row.updated_at).toISOString() : "",
  };
}

async function listDonationConfig(req, res) {
  const pool = getMySqlPool();
  const [states] = await pool.execute("SELECT id, name FROM states ORDER BY name ASC");
  const [cities] = await pool.execute(
    `SELECT c.id, c.city_name, c.state_id, s.name AS state_name
       FROM cities c
       LEFT JOIN states s ON s.id = c.state_id
      ORDER BY c.city_name ASC`,
  );

  return res.json({
    states: states.map((row) => ({
      id: String(row.id),
      label: row.name || "",
      value: String(row.id),
      state_name: row.name || "",
    })),
    cities: cities.map((row) => ({
      id: String(row.id),
      label: row.city_name || "",
      value: String(row.id),
      state_id: row.state_id != null ? String(row.state_id) : "",
      state_name: row.state_name || "",
      city_name: row.city_name || "",
    })),
    paymentModeOptions: ["UPI", "Bank Transfer", "Cash", "Cheque", "NEFT / RTGS"].map(buildOption),
    purposeOptions: [
      "शिक्षा सहयोग",
      "छात्रवृत्ति सहायता",
      "स्वास्थ्य शिविर",
      "महिला सशक्तिकरण",
      "पर्यावरण अभियान",
      "ग्राम विकास",
      "सामान्य दान",
    ].map(buildOption),
  });
}

async function listDonations(req, res) {
  await ensureDonationTable();
  const pool = getMySqlPool();
  const [rows] = await pool.execute(
    `SELECT *
       FROM donations
      ORDER BY id DESC`,
  );
  return res.json(rows.map(mapDonation));
}

function createDonation(req, res) {
  uploadDonationReceipt.single("paymentReceipt")(req, res, async (error) => {
    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "Payment receipt must be 5MB or smaller" });
      }
      return res.status(400).json({ message: error.message || "Unable to upload receipt" });
    }

    if (error) {
      return res.status(400).json({ message: error.message || "Unable to upload receipt" });
    }

    try {
      await ensureDonationTable();

      const body = req.body || {};
      const normalized = {
        donor_name: String(body.donorName || "").trim(),
        mobile: String(body.mobile || "").trim(),
        email: String(body.email || "").trim(),
        state_id: body.stateId ? Number(body.stateId) : null,
        state_name: String(body.stateName || "").trim(),
        city_id: body.cityId ? Number(body.cityId) : null,
        city_name: String(body.cityName || "").trim(),
        tehsil: String(body.tehsil || "").trim(),
        district: String(body.district || "").trim(),
        payment_mode: String(body.paymentMode || "").trim(),
        donation_amount: Number(body.donationAmount || 0),
        donation_date: String(body.donationDate || "").trim(),
        purpose: String(body.purpose || "").trim(),
        donor_identity: String(body.donorIdentity || "").trim(),
      };

      const requiredFields = [
        ["donor_name", "Donor name is required"],
        ["mobile", "Mobile number is required"],
        ["email", "Email is required"],
        ["state_name", "State is required"],
        ["city_name", "City is required"],
        ["tehsil", "Tehsil is required"],
        ["district", "District is required"],
        ["payment_mode", "Payment mode is required"],
        ["purpose", "Purpose is required"],
        ["donor_identity", "Donor identity is required"],
        ["donation_date", "Donation date is required"],
      ];

      for (const [key, message] of requiredFields) {
        if (!normalized[key]) {
          return res.status(400).json({ message });
        }
      }

      if (!/^[6-9]\d{9}$/.test(normalized.mobile)) {
        return res.status(400).json({ message: "Valid mobile number is required" });
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized.email)) {
        return res.status(400).json({ message: "Valid email is required" });
      }

      if (!normalized.donation_amount || Number.isNaN(normalized.donation_amount) || normalized.donation_amount <= 0) {
        return res.status(400).json({ message: "Valid donation amount is required" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "Payment receipt is required" });
      }

      const paymentReceipt = `/uploads/donations/${req.file.filename}`;

      const pool = getMySqlPool();
      const [result] = await pool.execute(
        `INSERT INTO donations
          (donor_name, mobile, email, state_id, state_name, city_id, city_name, tehsil, district, payment_mode, donation_amount, donation_date, purpose, donor_identity, payment_receipt, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          normalized.donor_name,
          normalized.mobile,
          normalized.email,
          normalized.state_id,
          normalized.state_name,
          normalized.city_id,
          normalized.city_name,
          normalized.tehsil,
          normalized.district,
          normalized.payment_mode,
          normalized.donation_amount,
          normalized.donation_date,
          normalized.purpose,
          normalized.donor_identity,
          paymentReceipt,
          "pending",
        ],
      );

      const [rows] = await pool.execute("SELECT * FROM donations WHERE id = ? LIMIT 1", [result.insertId]);
      return res.status(201).json(mapDonation(rows[0]));
    } catch (submitError) {
      return res.status(500).json({ message: submitError.message || "Unable to submit donation" });
    }
  });
}

module.exports = {
  listDonationConfig,
  listDonations,
  createDonation,
};
