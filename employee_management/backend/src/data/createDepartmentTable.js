import pool from "../config/db.js";

const createDepartmentTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL)`;

  try {
    await pool.query(queryText);
    console.log("Department table created.");
  } catch (err) {
    console.log(err);
  }
};

export default createDepartmentTable;
