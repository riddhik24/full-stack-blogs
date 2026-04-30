import pool from "../config/db.js";

const createEmployeeTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS employee (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone VARCHAR(20),
    department_id INT REFERENCES department(id),
    position VARCHAR(100),
    joining_date DATE,
    salary NUMERIC(10,2)
    )`;

  try {
    await pool.query(queryText);
    console.log("Employee table created");
  } catch (err) {
    console.log(err);
  }
};

export default createEmployeeTable;
