import pool from "../config/db.js";

const createRolesTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL
    )`;

  try {
    await pool.query(queryText);
    console.log("Roles table created");
  } catch (err) {
    console.log(err);
  }
};

export default createRolesTable;
