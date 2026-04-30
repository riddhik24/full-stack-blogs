import pool from "../config/db.js";

const createPayrollTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS payroll (
    id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES employee(id),
    basic_salary NUMERIC(10,2),
    salary_month DATE
)`;

  try {
    await pool.query(queryText);
    console.log("Payroll table created");
  } catch (err) {
    console.log(err);
  }
};

export default createPayrollTable;
