import pool from "../config/db.js";

export const getTaskService = async (userId) => {
  const result = await pool.query("SELECT * FROM tasks WHERE userId = $1", [
    userId,
  ]);

  return result.rows;
};

export const createTaskService = async (title, userId) => {
  const result = await pool.query(
    "INSERT INTO tasks (title,completed,userId) VALUES($1,$2,$3) RETURNING *",
    [title, false, userId],
  );

  return result.rows[0];
};

export const updateTaskService = async (taskId, title, completed, userId) => {
  const result = await pool.query(
    "UPDATE tasks SET title = COALESCE($1, title), completed = COALESCE($2, completed) WHERE taskId = $3 AND userId = $4 RETURNING *",
    [title ?? null, completed ?? null, taskId, userId],
  );

  return result.rows[0];
};

export const deleteTaskService = async (taskId) => {
  const result = await pool.query(
    "DELETE FROM tasks WHERE taskId = $1 RETURNING *",
    [taskId],
  );

  return result.rows[0];
};
