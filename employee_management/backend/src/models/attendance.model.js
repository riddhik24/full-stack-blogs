import pool from "../config/db.js";

const getAttendanceByIdService = async (id) => {
  const result = await pool.query("SELECT * FROM attendance WHERE id=$1", [id]);
  return result.rows[0];
};

const checkInService = async (id) => {
  const result = await pool.query(
    `INSERT INTO attendance (employee_id, check_in) VALUES ($1,NOW()) RETURNING *`,
    [id],
  );
  return result.rows[0];
};
const checkOutService = async (id) => {
  const result = await pool.query(
    `INSERT INTO attendance (employee_id, check_out) VALUES ($1,NOW()) RETURNING *`,
    [id],
  );
  return result.rows[0];
};

export { getAttendanceByIdService, checkInService, checkOutService };
