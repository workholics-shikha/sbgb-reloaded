const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { getMySqlPool } = require("../config/mysql");

const UPLOAD_DIR = path.join(process.cwd(), "uploads", "sbgbp-registrations");
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname || "").toLowerCase() || ".bin";
    const basename = path
      .basename(file.originalname || "sbgbp-file", extension)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 50);

    cb(null, `${Date.now()}-${basename || "sbgbp-file"}${extension}`);
  },
});

const uploadRegistrationFiles = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes =
      file.fieldname === "studentImage"
        ? ["image/jpeg", "image/png"]
        : ["image/jpeg", "image/png", "application/pdf"];

    if (!allowedTypes.includes(file.mimetype)) {
      cb(new Error("Invalid file type"));
      return;
    }

    cb(null, true);
  },
});

function mapRegistration(row) {
  return {
    id: String(row.id),
    circle: row.circle || "",
    circle_code: row.circle_code != null ? Number(row.circle_code) : null,
    reg_year: row.reg_year != null ? Number(row.reg_year) : null,
    registration_no: row.registration_no || "",
    new_registration_no: row.new_registration_no || "",
    new_roll_no: row.new_roll_no || "",
    check_roll_no: row.check_roll_no || "",
    student_name: row.student_name || "",
    student_image: row.student_image || "",
    father_name: row.father_name || "",
    mother_name: row.mother_name || "",
    user_category: row.user_category || "",
    p_address: row.p_address || "",
    contest_type: row.contest_type || "",
    class: row.class || "",
    school_name: row.school_name || "",
    pay_receipt: row.pay_receipt || "",
    transaction_id: row.transaction_id || "",
    uid: row.uid || "",
    mobile: row.mobile || "",
    mobile_guardian: row.mobile_guardian || "",
    email: row.email || "",
    payment_amount: row.payment_amount != null ? Number(row.payment_amount) : null,
    payment_status: row.payment_status || "pending",
    razorpay_payment_id: row.razorpay_payment_id || "",
    razorpay_order_id: row.razorpay_order_id || "",
    razorpay_signature: row.razorpay_signature || "",
    roll_no: row.roll_no || "",
    from_exam_time: row.from_exam_time || "",
    to_exam_time: row.to_exam_time || "",
    exam_time: row.exam_time || "",
    exam_date: row.exam_date || "",
    exam_centre: row.exam_centre || "",
    term_and_condition: Number(row.term_and_condition) === 1,
    status: row.status != null ? Number(row.status) : 0,
    created_at: row.created_at ? new Date(row.created_at).toISOString() : "",
    updated_at: row.updated_at ? new Date(row.updated_at).toISOString() : "",
  };
}

function buildOption(value, extra = {}) {
  return {
    id: String(value),
    label: String(value),
    value: String(value),
    ...extra,
  };
}

async function listSbgbpRegistrationConfig(req, res) {
  const pool = getMySqlPool();
  const currentYear = new Date().getFullYear();

  const [circleRows] = await pool.execute(
    "SELECT id, circle_name FROM circles WHERE circle_name IS NOT NULL AND circle_name <> '' ORDER BY circle_name ASC",
  );
  const [contestTypeRows] = await pool.execute(
    "SELECT DISTINCT contest_type FROM sbgbp_registrations WHERE contest_type IS NOT NULL AND contest_type <> '' ORDER BY contest_type ASC",
  );
  const [classRows] = await pool.execute(
    "SELECT DISTINCT class FROM sbgbp_registrations WHERE class IS NOT NULL AND class <> '' ORDER BY CAST(class AS UNSIGNED) ASC, class ASC",
  );
  const [categoryRows] = await pool.execute(
    "SELECT DISTINCT user_category FROM sbgbp_registrations WHERE user_category IS NOT NULL AND user_category <> '' ORDER BY user_category ASC",
  );
  const [paymentRows] = await pool.execute(
    "SELECT DISTINCT payment_amount FROM sbgbp_registrations WHERE payment_amount IS NOT NULL ORDER BY payment_amount ASC",
  );
  const [centerRows] = await pool.execute(
    `SELECT circle, MAX(exam_centre) AS exam_centre
       FROM sbgbp_registrations
      WHERE circle IS NOT NULL AND circle <> ''
        AND exam_centre IS NOT NULL AND exam_centre <> ''
      GROUP BY circle
      ORDER BY circle ASC`,
  );

  const examCenterByCircle = Object.fromEntries(
    centerRows.map((row) => [String(row.circle || ""), String(row.exam_centre || "")]),
  );

  return res.json({
    regYearOptions: [currentYear, currentYear - 1, currentYear + 1].map((year) =>
      buildOption(year),
    ),
    circles: circleRows.map((row) =>
      buildOption(row.circle_name || "", {
        circle_code: row.id != null ? Number(row.id) : null,
        exam_centre: examCenterByCircle[String(row.circle_name || "")] || "",
      }),
    ),
    contestTypeOptions:
      contestTypeRows.length > 0
        ? contestTypeRows.map((row) => buildOption(row.contest_type || ""))
        : ["School Level Competition", "General Knowledge Competition"].map(buildOption),
    classOptions:
      classRows.length > 0
        ? classRows.map((row) => buildOption(row.class || ""))
        : ["8", "9", "10", "11", "12"].map(buildOption),
    categoryOptions:
      categoryRows.length > 0
        ? categoryRows.map((row) => buildOption(row.user_category || ""))
        : ["General", "OBC", "SC", "ST"].map(buildOption),
    paymentAmountOptions:
      paymentRows.length > 0
        ? paymentRows.map((row) => ({
            id: String(row.payment_amount),
            label: `₹${Number(row.payment_amount).toFixed(2)}`,
            value: String(Number(row.payment_amount)),
          }))
        : [{ id: "50", label: "₹50.00", value: "50" }],
    paymentStatusOptions: ["pending", "completed", "failed", "refunded"].map(buildOption),
  });
}

async function listSbgbpRegistrations(req, res) {
  const pool = getMySqlPool();
  const [rows] = await pool.execute(
    `SELECT *
       FROM sbgbp_registrations
      ORDER BY id DESC`,
  );
  return res.json(rows.map(mapRegistration));
}

function createSbgbpRegistration(req, res) {
  uploadRegistrationFiles.fields([
    { name: "studentImage", maxCount: 1 },
    { name: "payReceipt", maxCount: 1 },
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
      const body = req.body || {};
      const normalized = {
        circle: String(body.circle || "").trim(),
        circle_code: body.circleCode ? Number(body.circleCode) : null,
        reg_year: Number(body.regYear || new Date().getFullYear()),
        student_name: String(body.studentName || "").trim(),
        father_name: String(body.fatherName || "").trim(),
        mother_name: String(body.motherName || "").trim(),
        user_category: String(body.userCategory || "").trim(),
        p_address: String(body.address || "").trim(),
        contest_type: String(body.contestType || "").trim(),
        class: String(body.className || "").trim(),
        school_name: String(body.schoolName || "").trim(),
        transaction_id: String(body.transactionId || "").trim(),
        uid: String(body.uid || "").trim(),
        mobile: String(body.mobile || "").trim(),
        mobile_guardian: String(body.mobileGuardian || "").trim(),
        email: String(body.email || "").trim(),
        payment_amount: Number(body.paymentAmount || 0),
        payment_status: String(body.paymentStatus || "pending").trim() || "pending",
        roll_no: String(body.rollNo || "").trim(),
        exam_time: String(body.examTime || "").trim(),
        exam_date: String(body.examDate || "").trim(),
        exam_centre: String(body.examCentre || "").trim(),
        term_and_condition:
          body.termAndCondition === true ||
          body.termAndCondition === "true" ||
          body.termAndCondition === "1" ||
          body.termAndCondition === 1,
      };

      const requiredChecks = [
        ["circle", "Circle is required"],
        ["student_name", "Student name is required"],
        ["father_name", "Father name is required"],
        ["mother_name", "Mother name is required"],
        ["user_category", "Category is required"],
        ["p_address", "Address is required"],
        ["contest_type", "Contest type is required"],
        ["class", "Class is required"],
        ["school_name", "School name is required"],
        ["mobile", "Mobile number is required"],
        ["mobile_guardian", "Guardian mobile number is required"],
        ["payment_status", "Payment status is required"],
      ];

      for (const [field, message] of requiredChecks) {
        if (!normalized[field]) {
          return res.status(400).json({ message });
        }
      }

      if (!/^[6-9]\d{9}$/.test(normalized.mobile)) {
        return res.status(400).json({ message: "Valid mobile number is required" });
      }

      if (!/^[6-9]\d{9}$/.test(normalized.mobile_guardian)) {
        return res.status(400).json({ message: "Valid guardian mobile number is required" });
      }

      if (normalized.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized.email)) {
        return res.status(400).json({ message: "Valid email is required" });
      }

      if (!normalized.payment_amount || Number.isNaN(normalized.payment_amount) || normalized.payment_amount < 0) {
        return res.status(400).json({ message: "Payment amount is required" });
      }

      if (!normalized.term_and_condition) {
        return res.status(400).json({ message: "Terms acceptance is required" });
      }

      if (!req.files?.studentImage?.[0]) {
        return res.status(400).json({ message: "Student image is required" });
      }

      if (!req.files?.payReceipt?.[0]) {
        return res.status(400).json({ message: "Payment receipt is required" });
      }

      const studentImage = `/uploads/sbgbp-registrations/${req.files.studentImage[0].filename}`;
      const payReceipt = `/uploads/sbgbp-registrations/${req.files.payReceipt[0].filename}`;

      const pool = getMySqlPool();
      const [result] = await pool.execute(
        `INSERT INTO sbgbp_registrations
          (circle, circle_code, reg_year, student_name, student_image, father_name, mother_name, user_category, p_address, contest_type, class, school_name, pay_receipt, transaction_id, uid, mobile, mobile_guardian, email, payment_amount, payment_status, roll_no, exam_time, exam_date, exam_centre, term_and_condition, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          normalized.circle,
          normalized.circle_code,
          normalized.reg_year,
          normalized.student_name,
          studentImage,
          normalized.father_name,
          normalized.mother_name,
          normalized.user_category,
          normalized.p_address,
          normalized.contest_type,
          normalized.class,
          normalized.school_name,
          payReceipt,
          normalized.transaction_id || null,
          normalized.uid || null,
          normalized.mobile,
          normalized.mobile_guardian,
          normalized.email || null,
          normalized.payment_amount,
          normalized.payment_status,
          normalized.roll_no || null,
          normalized.exam_time || null,
          normalized.exam_date || null,
          normalized.exam_centre || null,
          normalized.term_and_condition ? 1 : 0,
          0,
        ],
      );

      const generatedRegistrationNo = `SBGBP-${normalized.reg_year}-${String(result.insertId).padStart(5, "0")}`;
      await pool.execute(
        "UPDATE sbgbp_registrations SET registration_no = ?, new_registration_no = ? WHERE id = ?",
        [generatedRegistrationNo, generatedRegistrationNo, result.insertId],
      );

      const [rows] = await pool.execute(
        "SELECT * FROM sbgbp_registrations WHERE id = ? LIMIT 1",
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

async function deleteSbgbpRegistration(req, res) {
  const pool = getMySqlPool();
  const [rows] = await pool.execute(
    "SELECT student_image, pay_receipt FROM sbgbp_registrations WHERE id = ? LIMIT 1",
    [Number(req.params.id)],
  );

  if (!rows.length) {
    return res.status(404).json({ message: "Registration not found" });
  }

  const [result] = await pool.execute("DELETE FROM sbgbp_registrations WHERE id = ?", [
    Number(req.params.id),
  ]);

  if (!result.affectedRows) {
    return res.status(404).json({ message: "Registration not found" });
  }

  [rows[0].student_image, rows[0].pay_receipt]
    .filter(Boolean)
    .forEach((filePath) => {
      const absolutePath = path.join(process.cwd(), String(filePath).replace(/^\//, ""));
      if (fs.existsSync(absolutePath)) {
        fs.unlinkSync(absolutePath);
      }
    });

  return res.json({ message: "Registration deleted" });
}

module.exports = {
  listSbgbpRegistrationConfig,
  listSbgbpRegistrations,
  createSbgbpRegistration,
  deleteSbgbpRegistration,
};
