import bcrypt from "bcryptjs";
import pool from "../config/db.js";

export const registerUserService = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    "INSERT INTO users (email,password) VALUES ($1,$2) RETURNING id,email",
    [email, hashedPassword],
  );
  return result.rows[0];
};

export const loginUserService = async (email, password) => {
  const result = await pool.query(
    "SELECT id,email,password FROM users WHERE email=$1",
    [email],
  );

  return result.rows[0];
};
