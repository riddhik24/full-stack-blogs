import pool from "../config/db.js";

const createUserTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS tasks (
    taskId SERIAL PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    userId INT NOT NULL
);`;

  try {
    pool.query(queryText);
    console.log("Task table created");
  } catch (err) {
    console.log("Error creating user table", err);
  }
};

export default createUserTable;
