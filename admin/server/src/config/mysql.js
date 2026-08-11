const mysql = require("mysql2/promise");

let pool;

function getConnectionOptions() {
  return {
    host: process.env.MYSQL_HOST || "127.0.0.1",
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "team_sbgbt",
    waitForConnections: true,
    connectionLimit: Number(process.env.MYSQL_CONNECTION_LIMIT || 10),
    queueLimit: 0,
  };
}

async function connectMySql() {
  if (!pool) {
    pool = mysql.createPool(getConnectionOptions());
  }

  const connection = await pool.getConnection();
  try {
    await connection.query("SELECT 1");
    console.log(`Connected MySQL: ${getConnectionOptions().database}`);
  } finally {
    connection.release();
  }

  return pool;
}

function getMySqlPool() {
  if (!pool) {
    throw new Error("MySQL pool is not initialized");
  }

  return pool;
}

module.exports = { connectMySql, getMySqlPool };
