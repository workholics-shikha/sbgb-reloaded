require("dotenv").config();

const { connectMySql } = require("../config/mysql");
const { User } = require("../models/User");

async function seedAdmin() {
  const adminName = process.env.ADMIN_NAME || "Default Admin";
  const adminEmail = (process.env.ADMIN_EMAIL || "admin@swadeshi.local").toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || "ChangeMe123!";

  await connectMySql();

  const password = await User.hashPassword(adminPassword);
  await User.upsertAdmin({ name: adminName, email: adminEmail, password });

  console.log(`Default admin is ready: ${adminEmail}`);
}

seedAdmin()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    
  });

