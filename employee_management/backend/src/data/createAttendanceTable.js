import pool from "../config/db.js";

const createAttendanceTable = async (next) => {
  const queryText = `CREATE TABLE IF NOT EXISTS attendance (
    id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES employees(id) ON DELETE CASCADE,
    check_in TIMESTAMP,
    check_out TIMESTAMP,
    attendance_date DATE DEFAULT CURRENT_DATE
    )`;

  try {
    await pool.query(queryText);
    console.log("Attendance table created.");
  } catch (err) {
    next(err);
  }
};

export default createAttendanceTable;
