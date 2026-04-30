import pool from "../config/db.js";

const createUsersTable = async () => {
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
    console.log(err);
  }
};

export default createUsersTable;
