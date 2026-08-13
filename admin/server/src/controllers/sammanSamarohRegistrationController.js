const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { getMySqlPool } = require("../config/mysql");

const UPLOAD_DIR = path.join(process.cwd(), "uploads", "samman-samaroh");
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname || "").toLowerCase() || ".bin";
    const basename = path
      .basename(file.originalname || "result-document", extension)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 50);

    cb(null, `${Date.now()}-${basename || "result-document"}${extension}`);
  },
});

const uploadResultDocument = multer({
  storage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      cb(new Error("Only JPG, PNG, or PDF files are allowed"));
      return;
    }
    cb(null, true);
  },
});

async function ensureSammanSamarohTable() {
  const pool = getMySqlPool();
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS samman_samaroh_registrations (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      student_name VARCHAR(255) NOT NULL,
      father_name VARCHAR(255) NOT NULL,
      permanent_address TEXT NOT NULL,
      state_id INT NULL,
      city_id INT NULL,
      tehsil VARCHAR(255) NOT NULL,
      district VARCHAR(255) NOT NULL,
      aadhaar_number VARCHAR(20) NOT NULL,
      mobile VARCHAR(20) NOT NULL,
      email VARCHAR(255) NULL,
      academic_session VARCHAR(50) NOT NULL,
      class_course_degree VARCHAR(255) NOT NULL,
      marks_percentage DECIMAL(5,2) NOT NULL,
      roll_number VARCHAR(100) NOT NULL,
      board_university VARCHAR(255) NOT NULL,
      school_name VARCHAR(255) NULL,
      school_address TEXT NULL,
      current_study_details TEXT NULL,
      result_document VARCHAR(255) NOT NULL,
      accepted_declaration TINYINT(1) NOT NULL DEFAULT 1,
      status VARCHAR(30) NOT NULL DEFAULT 'pending',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
}

function mapRegistration(row) {
  return {
    id: String(row.id),
    student_name: row.student_name || "",
    father_name: row.father_name || "",
    permanent_address: row.permanent_address || "",
    state_id: row.state_id != null ? String(row.state_id) : "",
    state_name: row.state_name || "",
    city_id: row.city_id != null ? String(row.city_id) : "",
    city_name: row.city_name || "",
    tehsil: row.tehsil || "",
    district: row.district || "",
    aadhaar_number: row.aadhaar_number || "",
    mobile: row.mobile || "",
    email: row.email || "",
    academic_session: row.academic_session || "",
    class_course_degree: row.class_course_degree || "",
    marks_percentage: row.marks_percentage != null ? Number(row.marks_percentage) : null,
    roll_number: row.roll_number || "",
    board_university: row.board_university || "",
    school_name: row.school_name || "",
    school_address: row.school_address || "",
    current_study_details: row.current_study_details || "",
    result_document: row.result_document || "",
    accepted_declaration: Number(row.accepted_declaration) === 1,
    status: row.status || "pending",
    created_at: row.created_at ? new Date(row.created_at).toISOString() : "",
    updated_at: row.updated_at ? new Date(row.updated_at).toISOString() : "",
  };
}

function buildAcademicSessions() {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 7 }, (_, index) => {
    const startYear = currentYear - index;
    const endYear = String(startYear + 1).slice(-2);
    const label = `${startYear}-${endYear}`;
    return { id: label, label, value: label };
  });
}

async function listSammanSamarohRegistrationConfig(req, res) {
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
    academicSessionOptions: buildAcademicSessions(),
    classCourseOptions: [
      "10th",
      "12th",
      "Diploma",
      "ITI",
      "Undergraduate",
      "Postgraduate",
      "Other",
    ].map((value) => ({ id: value, label: value, value })),
  });
}

async function listSammanSamarohRegistrations(req, res) {
  await ensureSammanSamarohTable();
  const pool = getMySqlPool();
  const [rows] = await pool.execute(
    `SELECT sr.*, s.name AS state_name, c.city_name
       FROM samman_samaroh_registrations sr
       LEFT JOIN states s ON s.id = sr.state_id
       LEFT JOIN cities c ON c.id = sr.city_id
      ORDER BY sr.id DESC`,
  );
  return res.json(rows.map(mapRegistration));
}

function createSammanSamarohRegistration(req, res) {
  uploadResultDocument.single("resultDocument")(req, res, async (error) => {
    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "Result document must be 1MB or smaller" });
      }
      return res.status(400).json({ message: error.message || "Unable to upload document" });
    }

    if (error) {
      return res.status(400).json({ message: error.message || "Unable to upload document" });
    }

    try {
      await ensureSammanSamarohTable();

      const body = req.body || {};
      const normalized = {
        student_name: String(body.studentName || "").trim(),
        father_name: String(body.fatherName || "").trim(),
        permanent_address: String(body.permanentAddress || "").trim(),
        state_id: Number(body.stateId || 0),
        city_id: Number(body.cityId || 0),
        tehsil: String(body.tehsil || "").trim(),
        district: String(body.district || "").trim(),
        aadhaar_number: String(body.aadhaarNumber || "").trim(),
        mobile: String(body.mobile || "").trim(),
        email: String(body.email || "").trim(),
        academic_session: String(body.academicSession || "").trim(),
        class_course_degree: String(body.classCourseDegree || "").trim(),
        marks_percentage: Number(body.marksPercentage || 0),
        roll_number: String(body.rollNumber || "").trim(),
        board_university: String(body.boardUniversity || "").trim(),
        school_name: String(body.schoolName || "").trim(),
        school_address: String(body.schoolAddress || "").trim(),
        current_study_details: String(body.currentStudyDetails || "").trim(),
        accepted_declaration:
          body.acceptedDeclaration === true ||
          body.acceptedDeclaration === "true" ||
          body.acceptedDeclaration === "1" ||
          body.acceptedDeclaration === 1,
      };

      const requiredFields = [
        ["student_name", "Student name is required"],
        ["father_name", "Father name is required"],
        ["permanent_address", "Permanent address is required"],
        ["state_id", "State is required"],
        ["city_id", "City is required"],
        ["tehsil", "Tehsil is required"],
        ["district", "District is required"],
        ["aadhaar_number", "Aadhaar number is required"],
        ["mobile", "Mobile number is required"],
        ["academic_session", "Academic session is required"],
        ["class_course_degree", "Class/Course/Degree is required"],
        ["roll_number", "Roll number is required"],
        ["board_university", "Board/University is required"],
      ];

      for (const [key, message] of requiredFields) {
        if (!normalized[key]) {
          return res.status(400).json({ message });
        }
      }

      if (!/^\d{12}$/.test(normalized.aadhaar_number)) {
        return res.status(400).json({ message: "Valid 12-digit Aadhaar number is required" });
      }

      if (!/^[6-9]\d{9}$/.test(normalized.mobile)) {
        return res.status(400).json({ message: "Valid mobile number is required" });
      }

      if (
        normalized.email &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized.email)
      ) {
        return res.status(400).json({ message: "Valid email is required" });
      }

      if (
        Number.isNaN(normalized.marks_percentage) ||
        normalized.marks_percentage < 0 ||
        normalized.marks_percentage > 100
      ) {
        return res.status(400).json({ message: "Marks percentage must be between 0 and 100" });
      }

      if (!normalized.accepted_declaration) {
        return res.status(400).json({ message: "Declaration acceptance is required" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "Result document is required" });
      }

      const pool = getMySqlPool();
      const [result] = await pool.execute(
        `INSERT INTO samman_samaroh_registrations
          (student_name, father_name, permanent_address, state_id, city_id, tehsil, district, aadhaar_number, mobile, email, academic_session, class_course_degree, marks_percentage, roll_number, board_university, school_name, school_address, current_study_details, result_document, accepted_declaration)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          normalized.student_name,
          normalized.father_name,
          normalized.permanent_address,
          normalized.state_id,
          normalized.city_id,
          normalized.tehsil,
          normalized.district,
          normalized.aadhaar_number,
          normalized.mobile,
          normalized.email || null,
          normalized.academic_session,
          normalized.class_course_degree,
          normalized.marks_percentage,
          normalized.roll_number,
          normalized.board_university,
          normalized.school_name || null,
          normalized.school_address || null,
          normalized.current_study_details || null,
          `/uploads/samman-samaroh/${req.file.filename}`,
          normalized.accepted_declaration ? 1 : 0,
        ],
      );

      const [rows] = await pool.execute(
        `SELECT sr.*, s.name AS state_name, c.city_name
           FROM samman_samaroh_registrations sr
           LEFT JOIN states s ON s.id = sr.state_id
           LEFT JOIN cities c ON c.id = sr.city_id
          WHERE sr.id = ?
          LIMIT 1`,
        [result.insertId],
      );

      return res.status(201).json(mapRegistration(rows[0]));
    } catch (requestError) {
      return res.status(500).json({
        message:
          requestError instanceof Error
            ? requestError.message
            : "Unable to save registration",
      });
    }
  });
}

async function deleteSammanSamarohRegistration(req, res) {
  await ensureSammanSamarohTable();
  const pool = getMySqlPool();
  const [rows] = await pool.execute(
    "SELECT result_document FROM samman_samaroh_registrations WHERE id = ? LIMIT 1",
    [Number(req.params.id)],
  );

  if (!rows.length) {
    return res.status(404).json({ message: "Registration not found" });
  }

  const [result] = await pool.execute(
    "DELETE FROM samman_samaroh_registrations WHERE id = ?",
    [Number(req.params.id)],
  );

  if (!result.affectedRows) {
    return res.status(404).json({ message: "Registration not found" });
  }

  const uploadPath = rows[0].result_document
    ? path.join(process.cwd(), rows[0].result_document.replace(/^\//, ""))
    : "";

  if (uploadPath && fs.existsSync(uploadPath)) {
    fs.unlinkSync(uploadPath);
  }

  return res.json({ message: "Registration deleted" });
}

module.exports = {
  listSammanSamarohRegistrationConfig,
  listSammanSamarohRegistrations,
  createSammanSamarohRegistration,
  deleteSammanSamarohRegistration,
};
