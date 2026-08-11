const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { getMySqlPool } = require("../config/mysql");

const REGISTRATION_UPLOAD_DIR = path.join(process.cwd(), "uploads", "utthan-registrations");
fs.mkdirSync(REGISTRATION_UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, REGISTRATION_UPLOAD_DIR),
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname || "").toLowerCase() || ".bin";
    const basename = path
      .basename(file.originalname || "registration-file", extension)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40);

    cb(null, `${Date.now()}-${basename || "registration-file"}${extension}`);
  },
});

const uploadRegistrationFiles = multer({
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

async function ensureUtthanRegistrationTable() {
  const pool = getMySqlPool();
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS utthan_coaching_registrations (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      organization_name VARCHAR(255) NOT NULL,
      student_name VARCHAR(255) NOT NULL,
      gender VARCHAR(30) NOT NULL,
      date_of_birth DATE NOT NULL,
      qualification VARCHAR(255) NOT NULL,
      mobile VARCHAR(20) NOT NULL,
      email VARCHAR(255) NOT NULL,
      student_id_number VARCHAR(255) NOT NULL,
      student_id_photo VARCHAR(255) NULL,
      father_name VARCHAR(255) NOT NULL,
      father_id_number VARCHAR(255) NULL,
      father_id_photo VARCHAR(255) NULL,
      category VARCHAR(50) NOT NULL,
      current_address TEXT NOT NULL,
      permanent_address TEXT NOT NULL,
      state_name VARCHAR(255) NOT NULL,
      city_name VARCHAR(255) NOT NULL,
      course_name VARCHAR(255) NOT NULL,
      course_admission_date DATE NOT NULL,
      course_admission_year INT NOT NULL,
      course_duration VARCHAR(50) NOT NULL,
      student_photo VARCHAR(255) NOT NULL,
      blood_group VARCHAR(10) NULL,
      aadhaar_number VARCHAR(20) NULL,
      accepted_terms TINYINT(1) NOT NULL DEFAULT 1,
      status VARCHAR(30) NOT NULL DEFAULT 'pending',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
}

function mapRegistration(row) {
  return {
    id: String(row.id),
    organization_name: row.organization_name || "",
    student_name: row.student_name || "",
    gender: row.gender || "",
    date_of_birth: row.date_of_birth || "",
    qualification: row.qualification || "",
    mobile: row.mobile || "",
    email: row.email || "",
    student_id_number: row.student_id_number || "",
    student_id_photo: row.student_id_photo || "",
    father_name: row.father_name || "",
    father_id_number: row.father_id_number || "",
    father_id_photo: row.father_id_photo || "",
    category: row.category || "",
    current_address: row.current_address || "",
    permanent_address: row.permanent_address || "",
    state_name: row.state_name || "",
    city_name: row.city_name || "",
    course_name: row.course_name || "",
    course_admission_date: row.course_admission_date || "",
    course_admission_year: row.course_admission_year != null ? Number(row.course_admission_year) : null,
    course_duration: row.course_duration || "",
    student_photo: row.student_photo || "",
    blood_group: row.blood_group || "",
    aadhaar_number: row.aadhaar_number || "",
    accepted_terms: Number(row.accepted_terms) === 1,
    status: row.status || "pending",
    created_at: row.created_at ? new Date(row.created_at).toISOString() : "",
    updated_at: row.updated_at ? new Date(row.updated_at).toISOString() : "",
  };
}

async function listUtthanRegistrationConfig(req, res) {
  const pool = getMySqlPool();
  const [organizations] = await pool.execute(
    "SELECT id, name FROM coaching_organizations WHERE status = 1 ORDER BY name ASC",
  );
  const [states] = await pool.execute(
    "SELECT id, name FROM states ORDER BY name ASC",
  );
  const [cities] = await pool.execute(
    `SELECT c.id, c.city_name, c.state_id, s.name AS state_name
       FROM cities c
       LEFT JOIN states s ON s.id = c.state_id
      ORDER BY c.city_name ASC`,
  );

  return res.json({
    organizations: organizations.map((row) => ({
      id: String(row.id),
      label: row.name || "",
      value: row.name || "",
    })),
    states: states.map((row) => ({
      id: String(row.id),
      label: row.name || "",
      value: row.name || "",
    })),
    cities: cities.map((row) => ({
      id: String(row.id),
      label: row.city_name || "",
      value: row.city_name || "",
      state_id: row.state_id != null ? String(row.state_id) : "",
      state_name: row.state_name || "",
    })),
    categoryOptions: ["General", "OBC", "SC", "ST", "EWS"],
    courseDurationOptions: ["3 Months", "6 Months", "1 Year", "2 Years"],
    bloodGroupOptions: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    genderOptions: ["पुरुष", "महिला"],
  });
}

async function listUtthanRegistrations(req, res) {
  await ensureUtthanRegistrationTable();
  const pool = getMySqlPool();
  const [rows] = await pool.execute(
    `SELECT *
       FROM utthan_coaching_registrations
      ORDER BY id DESC`,
  );
  return res.json(rows.map(mapRegistration));
}

function createUtthanRegistration(req, res) {
  uploadRegistrationFiles.fields([
    { name: "studentIdPhoto", maxCount: 1 },
    { name: "fatherIdPhoto", maxCount: 1 },
    { name: "studentPhoto", maxCount: 1 },
  ])(req, res, async (error) => {
    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "Files must be 5MB or smaller" });
      }
      return res.status(400).json({ message: error.message || "Unable to upload files" });
    }

    if (error) {
      return res.status(400).json({ message: error.message || "Unable to upload files" });
    }

    try {
      await ensureUtthanRegistrationTable();

      const body = req.body || {};
      const normalized = {
        organization_name: String(body.organization || "").trim(),
        student_name: String(body.studentName || "").trim(),
        gender: String(body.gender || "").trim(),
        date_of_birth: String(body.dateOfBirth || "").trim(),
        qualification: String(body.qualification || "").trim(),
        mobile: String(body.mobile || "").trim(),
        email: String(body.email || "").trim(),
        student_id_number: String(body.studentIdNumber || "").trim(),
        father_name: String(body.fatherName || "").trim(),
        father_id_number: String(body.fatherIdNumber || "").trim(),
        category: String(body.category || "").trim(),
        current_address: String(body.currentAddress || "").trim(),
        permanent_address: String(body.permanentAddress || "").trim(),
        state_name: String(body.state || "").trim(),
        city_name: String(body.city || "").trim(),
        course_name: String(body.courseName || "").trim(),
        course_admission_date: String(body.courseAdmissionDate || "").trim(),
        course_admission_year: Number(body.courseAdmissionYear || 0),
        course_duration: String(body.courseDuration || "").trim(),
        blood_group: String(body.bloodGroup || "").trim(),
        aadhaar_number: String(body.aadhaarNumber || "").trim(),
        accepted_terms:
          body.acceptedTerms === true ||
          body.acceptedTerms === "true" ||
          body.acceptedTerms === "1" ||
          body.acceptedTerms === 1,
      };

      const requiredFields = [
        ["organization_name", "Organization is required"],
        ["student_name", "Student name is required"],
        ["gender", "Gender is required"],
        ["date_of_birth", "Date of birth is required"],
        ["qualification", "Qualification is required"],
        ["mobile", "Mobile is required"],
        ["email", "Email is required"],
        ["student_id_number", "Student ID number is required"],
        ["father_name", "Father name is required"],
        ["category", "Category is required"],
        ["current_address", "Current address is required"],
        ["permanent_address", "Permanent address is required"],
        ["state_name", "State is required"],
        ["city_name", "City is required"],
        ["course_name", "Course name is required"],
        ["course_admission_date", "Course admission date is required"],
        ["course_duration", "Course duration is required"],
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

      if (!normalized.course_admission_year || Number.isNaN(normalized.course_admission_year)) {
        return res.status(400).json({ message: "Course admission year is required" });
      }

      if (!normalized.accepted_terms) {
        return res.status(400).json({ message: "Terms acceptance is required" });
      }

      const studentIdPhoto = req.files?.studentIdPhoto?.[0]
        ? `/uploads/utthan-registrations/${req.files.studentIdPhoto[0].filename}`
        : "";
      const fatherIdPhoto = req.files?.fatherIdPhoto?.[0]
        ? `/uploads/utthan-registrations/${req.files.fatherIdPhoto[0].filename}`
        : "";
      const studentPhoto = req.files?.studentPhoto?.[0]
        ? `/uploads/utthan-registrations/${req.files.studentPhoto[0].filename}`
        : "";

      if (!studentPhoto) {
        return res.status(400).json({ message: "Student photo is required" });
      }

      const pool = getMySqlPool();
      const [result] = await pool.execute(
        `INSERT INTO utthan_coaching_registrations
          (organization_name, student_name, gender, date_of_birth, qualification, mobile, email, student_id_number, student_id_photo, father_name, father_id_number, father_id_photo, category, current_address, permanent_address, state_name, city_name, course_name, course_admission_date, course_admission_year, course_duration, student_photo, blood_group, aadhaar_number, accepted_terms, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
        [
          normalized.organization_name,
          normalized.student_name,
          normalized.gender,
          normalized.date_of_birth,
          normalized.qualification,
          normalized.mobile,
          normalized.email,
          normalized.student_id_number,
          studentIdPhoto || null,
          normalized.father_name,
          normalized.father_id_number || null,
          fatherIdPhoto || null,
          normalized.category,
          normalized.current_address,
          normalized.permanent_address,
          normalized.state_name,
          normalized.city_name,
          normalized.course_name,
          normalized.course_admission_date,
          normalized.course_admission_year,
          normalized.course_duration,
          studentPhoto,
          normalized.blood_group || null,
          normalized.aadhaar_number || null,
          normalized.accepted_terms ? 1 : 0,
        ],
      );

      const [rows] = await pool.execute(
        "SELECT * FROM utthan_coaching_registrations WHERE id = ? LIMIT 1",
        [result.insertId],
      );

      return res.status(201).json(mapRegistration(rows[0]));
    } catch (handlerError) {
      return res.status(500).json({
        message: handlerError instanceof Error ? handlerError.message : "Unable to save registration",
      });
    }
  });
}

async function deleteUtthanRegistration(req, res) {
  await ensureUtthanRegistrationTable();
  const pool = getMySqlPool();
  const [result] = await pool.execute(
    "DELETE FROM utthan_coaching_registrations WHERE id = ?",
    [Number(req.params.id)],
  );

  if (!result.affectedRows) {
    return res.status(404).json({ message: "Registration not found" });
  }

  return res.json({ message: "Registration deleted" });
}

module.exports = {
  listUtthanRegistrationConfig,
  listUtthanRegistrations,
  createUtthanRegistration,
  deleteUtthanRegistration,
};
