import pool from "../config/db.js";

const createUserTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(200)
);`;

  try {
    pool.query(queryText);
    console.log("User table created");
  } catch (err) {
    console.log("Error creating user table", err);
  }
};

export default createUserTable;
