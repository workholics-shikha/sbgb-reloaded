const crypto = require("crypto");
const { User } = require("../models/User");
const { signToken } = require("../utils/jwt");

const RESET_CODE_TTL_MS = 10 * 60 * 1000;

function createResetCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function hashResetCode(code) {
  return crypto.createHash("sha256").update(String(code)).digest("hex");
}

async function login(req, res) {
  const { email, password, loginType } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const normalizedLoginType = String(loginType || "").trim();
  const user = await User.findOne({
    email: String(email).toLowerCase(),
    loginType: normalizedLoginType || undefined,
  });
  if (!user || !user.role) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const ok = await user.verifyPassword(String(password));

  if (!ok) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (user.role === "vendor" && !["approved", "active"].includes(user.status)) {
    return res.status(403).json({ message: "Your vendor account is not approved yet." });
  }

  const token = signToken(
    { sub: user.id, role: user.role, email: user.email },
    { secret: req.app.get("jwtSecret"), expiresIn: req.app.get("jwtExpiresIn") },
  );

  return res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      loginType: user.loginType,
      myRole: user.myRole,
      status: user.status,
      organizationId: user.organizationId,
    },
  });
}

async function logout(req, res) {
  return res.json({ message: "Logged out successfully" });
}

async function requestPasswordReset(req, res) {
  const { email } = req.body || {};

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const normalizedEmail = String(email).toLowerCase().trim();
  const user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    return res.json({
      message: "If an account exists for this email, a reset code has been generated.",
    });
  }

  const resetCode = createResetCode();
  await User.storePasswordReset(normalizedEmail, hashResetCode(resetCode));

  return res.json({
    message: "Reset code generated. Use it to create a new password.",
    resetCode,
    expiresInMinutes: RESET_CODE_TTL_MS / (60 * 1000),
  });
}

async function resetPassword(req, res) {
  const { email, code, newPassword } = req.body || {};

  if (!email || !code || !newPassword) {
    return res.status(400).json({ message: "Email, reset code, and new password are required" });
  }

  const normalizedEmail = String(email).toLowerCase().trim();
  const user = await User.findOne({ email: normalizedEmail });
  const resetEntry = await User.findPasswordReset(normalizedEmail);

  if (!user || !resetEntry?.token || !resetEntry.createdAt) {
    return res.status(400).json({ message: "Invalid or expired reset code" });
  }

  if (resetEntry.createdAt.getTime() + RESET_CODE_TTL_MS < Date.now()) {
    await User.clearPasswordReset(normalizedEmail);
    return res.status(400).json({ message: "Invalid or expired reset code" });
  }

  if (resetEntry.token !== hashResetCode(code)) {
    return res.status(400).json({ message: "Invalid or expired reset code" });
  }

  await User.updatePasswordByEmail(normalizedEmail, await User.hashPassword(String(newPassword)));
  await User.clearPasswordReset(normalizedEmail);

  return res.json({ message: "Password updated successfully. Please sign in with your new password." });
}

async function me(req, res) {
  const id = req.user?.sub;
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "User not found" });
  return res.json({ id: user.id, name: user.name, email: user.email, role: user.role, status: user.status });
}

module.exports = { login, logout, requestPasswordReset, resetPassword, me };
