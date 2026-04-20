import pool from "../config/db.js";

export const createPayrollService = async (
  employee_id,
  basic_salary,
  bonus,
  deductions,
  salary_month,
) => {
  //   const { employee_id, basic_salary, bonus, deductions, salary_month } = data;

  const result = await pool.query(
    `INSERT INTO payroll (employee_id, basic_salary, salary_month)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [employee_id, basic_salary, bonus, deductions, salary_month],
  );

  return result.rows[0];
};

export const getPayrollByEmployeeService = async (employee_id) => {
  const result = await pool.query(
    `SELECT *
     FROM payroll
     WHERE employee_id = $1
     ORDER BY salary_month DESC`,
    [employee_id],
  );

  return result.rows;
};
