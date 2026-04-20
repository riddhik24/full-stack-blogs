import pool from "../config/db.js";

const createDepartmentService = async (name) => {
  const result = await pool.query(
    "INSERT INTO department (name) VALUES ($1) RETURNING *",
    [name],
  );

  return result.rows[0];
};

const getDepartmentService = async () => {
  const result = await pool.query("SELECT * FROM department");
  return result.rows[0];
};

const updateDepartmentService = async (id, name) => {
  const result = await pool.query(
    "UPDATE department SET name=$1 WHERE id=$2 RETURNING *",
    [name, id],
  );

  return result.rows[0];
};

const deleteDepartmentService = async (id) => {
  const result = await pool.query(
    "DELETE FROM employee WHERE id=$1 RETURNING *",
    [id],
  );
  return result.rows[0];
};

export {
  createDepartmentService,
  getDepartmentService,
  updateDepartmentService,
  deleteDepartmentService,
};
