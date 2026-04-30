import pool from "../config/db.js";

const createEmployeeService = async (
  first_name,
  last_name,
  phone,
  department,
  position,
  joining_date,
  salary,
) => {
  const departmentResult = await pool.query(
    "SELECT id FROM department WHERE name=$1",
    [department],
  );
  const departmentId = departmentResult.rows[0].id;
  const result = await pool.query(
    `INSERT INTO employee (first_name,
    last_name,
    phone,
    department_id,
    position,
    joining_date,
    salary) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
    [
      first_name,
      last_name,
      phone,
      departmentId,
      position,
      joining_date,
      salary,
    ],
  );
  return result.rows[0];
};

const getEmployeeByIdService = async (id) => {
  const result = await pool.query(`SELECT * FROM employee WHERE id = $1`, [id]);
  return result.rows[0];
};

const getAllEmployeesService = async () => {
  const result = await pool.query("SELECT * FROM employee");
  return result.rows;
};

const updateEmployeeService = async (
  id,
  first_name,
  last_name,
  phone,
  department_id,
  position,
  salary,
) => {
  const result = await pool.query(
    `UPDATE employee
     SET first_name = COALESCE($1, first_name),
         last_name = COALESCE($2, last_name),
         phone = COALESCE($3, phone),
         department_id = COALESCE($4, department_id),
         position = COALESCE($5, position),
         salary = COALESCE($6, salary)
     WHERE id = $7
     RETURNING *`,
    [first_name, last_name, phone, department_id, position, salary, id],
  );

  return result.rows[0];
};

const deleteEmployeeService = async (id) => {
  const result = await pool.query(
    "DELETE FROM employee WHERE id=$1 RETURNING *",
    [id],
  );
  return result.rows[0];
};

const getEmployeeByDepartmentService = async (department) => {
  const departmentResult = await pool.query(
    "SELECT id FROM department WHERE name=$1",
    [department],
  );
  const departmentId = departmentResult.rows[0].id;
  const result = await pool.query(
    "SELECT * FROM employee WHERE department_id = $1",
    [departmentId],
  );

  return result.rows[0];
};

export {
  createEmployeeService,
  getAllEmployeesService,
  getEmployeeByIdService,
  getEmployeeByDepartmentService,
  updateEmployeeService,
  deleteEmployeeService,
};
