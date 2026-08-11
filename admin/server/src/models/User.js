const bcrypt = require("bcryptjs");
const { getMySqlPool } = require("../config/mysql");

const USER_ROLES = ["admin", "vendor"];
const USER_STATUS = ["active", "pending", "approved"];

const USERS_TABLE = "users";
const PASSWORD_RESETS_TABLE = "password_resets";
const DB_ADMIN_ROLE = 1;
const DB_ADMIN_MY_ROLE = 1;
const DB_VENDOR_ROLE = 3;
const DB_SBGBP_MANAGER_MY_ROLE = 3;
const DB_UTTHAN_MANAGER_MY_ROLE = 4;

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function buildUsername({ username, email, name }) {
  if (username) return String(username).trim();

  const emailValue = normalizeEmail(email);
  if (emailValue.includes("@")) {
    return emailValue.split("@")[0];
  }

  return String(name || "user")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "") || "user";
}

function getAppRoleFromRow(row) {
  if (Number(row.my_role) === DB_ADMIN_MY_ROLE) {
    return "admin";
  }

  if (Number(row.role) === DB_VENDOR_ROLE || Number(row.role) === DB_ADMIN_ROLE) {
    return "vendor";
  }

  return null;
}

function getLoginTypeFromRow(row) {
  if (Number(row.my_role) === DB_ADMIN_MY_ROLE) {
    return "admin";
  }

  if (Number(row.my_role) === DB_SBGBP_MANAGER_MY_ROLE) {
    return "sbgbp_manager";
  }

  if (Number(row.my_role) === DB_UTTHAN_MANAGER_MY_ROLE) {
    return "utthan_manager";
  }

  return "member";
}

function getAppStatusFromRow(row, role) {
  const isActive = Number(row.status) === 1 || Number(row.is_verify) === 1;
  if (!isActive) {
    return "pending";
  }

  return role === "admin" ? "active" : "approved";
}

function getDbRoleValues(role) {
  if (role === "admin") {
    return { role: DB_ADMIN_ROLE, myRole: DB_ADMIN_MY_ROLE };
  }

  return { role: DB_VENDOR_ROLE, myRole: 0 };
}

function getDbStatusValues(role, status) {
  if (role === "admin") {
    return { status: 1, isVerify: 1 };
  }

  if (status === "pending") {
    return { status: 0, isVerify: 0 };
  }

  return { status: 1, isVerify: 1 };
}

function mapRowToUser(row) {
  if (!row) return null;

  const role = getAppRoleFromRow(row);
  return new UserRecord({
    id: row.id,
    username: row.username || "",
    name: row.name || "",
    email: normalizeEmail(row.email),
    mobile: row.mobile || "",
    password: row.password || "",
    role,
    loginType: getLoginTypeFromRow(row),
    myRole: Number(row.my_role) || 0,
    status: getAppStatusFromRow(row, role),
    gender: row.gender || "",
    image: row.image || "",
    city: row.city || "",
    address: row.address || "",
    organizationId: Number(row.organization_id) || 0,
    createdAt: row.created_at ? new Date(row.created_at) : null,
    updatedAt: row.updated_at ? new Date(row.updated_at) : null,
  });
}

class UserRecord {
  constructor(data) {
    this._id = String(data.id);
    this.id = String(data.id);
    this.username = data.username || "";
    this.name = data.name || "";
    this.email = normalizeEmail(data.email);
    this.mobile = data.mobile || "";
    this.password = data.password || "";
    this.role = data.role;
    this.loginType = data.loginType || "member";
    this.myRole = Number(data.myRole) || 0;
    this.status = data.status || "pending";
    this.gender = data.gender || "";
    this.image = data.image || "";
    this.city = data.city || "";
    this.address = data.address || "";
    this.organizationId = Number(data.organizationId) || 0;
    this.createdAt = data.createdAt || null;
    this.updatedAt = data.updatedAt || null;
  }

  async verifyPassword(password) {
    if (!this.password) return false;
    return bcrypt.compare(password, this.password);
  }

  toJSON() {
    return {
      _id: this._id,
      id: this.id,
      username: this.username,
      name: this.name,
      email: this.email,
      mobile: this.mobile,
      role: this.role,
      loginType: this.loginType,
      myRole: this.myRole,
      status: this.status,
      gender: this.gender,
      image: this.image,
      city: this.city,
      address: this.address,
      organizationId: this.organizationId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  async save() {
    const pool = getMySqlPool();
    const dbRole = getDbRoleValues(this.role);
    const dbStatus = getDbStatusValues(this.role, this.status);

    await pool.execute(
      `UPDATE ${USERS_TABLE}
       SET username = ?, name = ?, email = ?, mobile = ?, password = ?, role = ?, my_role = ?,
           organization_id = ?, is_verify = ?, status = ?, updated_at = NOW()
       WHERE id = ?`,
      [
        buildUsername(this),
        this.name,
        normalizeEmail(this.email),
        this.mobile || null,
        this.password || null,
        dbRole.role,
        dbRole.myRole,
        this.organizationId || 0,
        dbStatus.isVerify,
        dbStatus.status,
        Number(this.id),
      ],
    );

    return User.findById(this.id);
  }
}

class User {
  static async hashPassword(password) {
    if (!password || String(password).length < 8) {
      throw new Error("Password must be at least 8 characters");
    }

    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(String(password), salt);
  }

  static async findById(id) {
    const pool = getMySqlPool();
    const [rows] = await pool.execute(
      `SELECT * FROM ${USERS_TABLE} WHERE id = ? AND is_delete = 0 LIMIT 1`,
      [Number(id)],
    );

    return mapRowToUser(rows[0]);
  }

  static async findOne(filter = {}) {
    const pool = getMySqlPool();
    const where = ["is_delete = 0"];
    const values = [];

    if (filter._id || filter.id) {
      where.push("id = ?");
      values.push(Number(filter._id || filter.id));
    }

    if (filter.email) {
      where.push("LOWER(email) = ?");
      values.push(normalizeEmail(filter.email));
    }

    if (filter.role === "admin") {
      where.push("my_role = ?");
      values.push(DB_ADMIN_MY_ROLE);
    } else if (filter.role === "vendor") {
      where.push("role = ?");
      values.push(DB_VENDOR_ROLE);
    }

    if (filter.loginType === "admin") {
      where.push("my_role = ?");
      values.push(DB_ADMIN_MY_ROLE);
    } else if (filter.loginType === "sbgbp_manager") {
      where.push("my_role = ?");
      values.push(DB_SBGBP_MANAGER_MY_ROLE);
    } else if (filter.loginType === "utthan_manager") {
      where.push("my_role = ?");
      values.push(DB_UTTHAN_MANAGER_MY_ROLE);
    } else if (filter.loginType === "member") {
      where.push("my_role NOT IN (?, ?, ?)");
      values.push(DB_ADMIN_MY_ROLE, DB_SBGBP_MANAGER_MY_ROLE, DB_UTTHAN_MANAGER_MY_ROLE);
    }

    const [rows] = await pool.execute(
      `SELECT * FROM ${USERS_TABLE} WHERE ${where.join(" AND ")} ORDER BY id DESC LIMIT 1`,
      values,
    );

    return mapRowToUser(rows[0]);
  }

  static async find(filter = {}) {
    const pool = getMySqlPool();
    const where = ["is_delete = 0"];
    const values = [];

    if (filter.role === "admin") {
      where.push("my_role = ?");
      values.push(DB_ADMIN_MY_ROLE);
    } else if (filter.role === "vendor") {
      where.push("role = ?");
      values.push(DB_VENDOR_ROLE);
    }

    if (filter.email) {
      where.push("LOWER(email) = ?");
      values.push(normalizeEmail(filter.email));
    }

    const [rows] = await pool.execute(
      `SELECT * FROM ${USERS_TABLE} WHERE ${where.join(" AND ")} ORDER BY created_at DESC, id DESC`,
      values,
    );

    return rows.map((row) => mapRowToUser(row));
  }

  static async create(data) {
    const pool = getMySqlPool();
    const role = USER_ROLES.includes(data.role) ? data.role : "vendor";
    const dbRole = getDbRoleValues(role);
    const dbStatus = getDbStatusValues(role, data.status || "pending");
    const email = normalizeEmail(data.email);

    const [result] = await pool.execute(
      `INSERT INTO ${USERS_TABLE}
       (username, name, email, password, mobile, gender, image, city, address, role, my_role,
        course_id, organization_id, remember_token, is_verify, is_delete, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, ?, NULL, ?, 0, ?, NOW(), NOW())`,
      [
        buildUsername(data),
        data.name,
        email,
        data.password || null,
        data.mobile || null,
        data.gender || null,
        data.image || null,
        data.city || null,
        data.address || null,
        dbRole.role,
        dbRole.myRole,
        Number(data.organizationId) || 0,
        dbStatus.isVerify,
        dbStatus.status,
      ],
    );

    return User.findById(result.insertId);
  }

  static async upsertAdmin({ name, email, password }) {
    const existing = await User.findOne({ email, role: "admin" });

    if (existing) {
      existing.name = name;
      existing.email = email;
      existing.password = password;
      existing.role = "admin";
      existing.status = "active";
      return existing.save();
    }

    return User.create({
      name,
      email,
      password,
      role: "admin",
      status: "active",
    });
  }

  static async storePasswordReset(email, token) {
    const pool = getMySqlPool();
    const normalizedEmail = normalizeEmail(email);

    await pool.execute(`DELETE FROM ${PASSWORD_RESETS_TABLE} WHERE email = ?`, [normalizedEmail]);
    await pool.execute(
      `INSERT INTO ${PASSWORD_RESETS_TABLE} (email, token, created_at) VALUES (?, ?, NOW())`,
      [normalizedEmail, token],
    );
  }

  static async findPasswordReset(email) {
    const pool = getMySqlPool();
    const [rows] = await pool.execute(
      `SELECT email, token, created_at FROM ${PASSWORD_RESETS_TABLE}
       WHERE email = ? ORDER BY created_at DESC LIMIT 1`,
      [normalizeEmail(email)],
    );

    if (!rows[0]) return null;

    return {
      email: normalizeEmail(rows[0].email),
      token: rows[0].token,
      createdAt: rows[0].created_at ? new Date(rows[0].created_at) : null,
    };
  }

  static async clearPasswordReset(email) {
    const pool = getMySqlPool();
    await pool.execute(`DELETE FROM ${PASSWORD_RESETS_TABLE} WHERE email = ?`, [normalizeEmail(email)]);
  }

  static async updatePasswordByEmail(email, password) {
    const pool = getMySqlPool();
    await pool.execute(
      `UPDATE ${USERS_TABLE} SET password = ?, updated_at = NOW() WHERE LOWER(email) = ? AND is_delete = 0`,
      [password, normalizeEmail(email)],
    );
  }
}

module.exports = { User, USER_ROLES, USER_STATUS };
