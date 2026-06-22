require("dotenv").config();
const { Pool } = require("pg");

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Test database connection
pool
  .query("SELECT NOW()")
  .then(() => {
    console.log("Connected to database ✅");
  })
  .catch((err) => {
    console.error("Connection error ❌", err);
  });

module.exports = pool;
