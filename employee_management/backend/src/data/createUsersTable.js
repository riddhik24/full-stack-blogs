import pool from "../config/db.js";

const createUsersTable = async (next) => {
  const queryText = `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role_id INT REFERENCES roles(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

  try {
    await pool.query(queryText);
    console.log("Users Table Created");
  } catch (err) {
    next(err);
  }
};

export default createUsersTable;
