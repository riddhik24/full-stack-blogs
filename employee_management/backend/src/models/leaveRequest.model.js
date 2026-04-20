export const applyLeaveService = async (
  employee_id,
  leave_type,
  start_date,
  end_date,
  reason,
) => {
  //   const { employee_id, leave_type, start_date, end_date, reason } = data;

  const result = await pool.query(
    `INSERT INTO leave_requests 
     (employee_id, leave_type, start_date, end_date, reason)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [employee_id, leave_type, start_date, end_date, reason],
  );

  return result.rows[0];
};

export const updateLeaveStatusService = async (id, status) => {
  const result = await pool.query(
    `UPDATE leave_requests
     SET status = $1
     WHERE id = $2
     RETURNING *`,
    [status, id],
  );

  return result.rows[0];
};
