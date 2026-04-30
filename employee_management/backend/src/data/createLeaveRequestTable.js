import pool from "../config/db.js";

const createLeaveRequestTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS leave_requests (
    id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES employee(id),
    leave_type VARCHAR(50),
    start_date DATE,
    end_date DATE,
    reason TEXT,
    status VARCHAR(20) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

  try {
    await pool.query(queryText);
    console.log("Leave requests table created.");
  } catch (err) {
    console.log(err);
  }
};

export default createLeaveRequestTable;
