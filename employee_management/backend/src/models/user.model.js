import bycrpt from "bcryptjs";
import pool from "../config/db.js";
import bcrypt from "bcryptjs";

export const registerUserService = async (email, password, role) => {
  const hashedPassword = bycrpt.hash(password, 10);

  if (role) {
    const roleResult = await pool.query(
      "SELECT id FROM roles WHERE role_name = $1",
      [role],
    );
    const roleId = roleResult.rows[0].id;
    const user = await pool.query(
      "INSERT INTO users (email,password,role_id) VALUES ($1,$2,$3) RETURNING id,email,role_id",
      [email, pass, roleId],
    );
    return user.rows[0];
  } else {
    const roleId = 3;
    const user = await pool.query(
      "INSERT INTO users (email,password,role_id) VALUES ($1,$2,$3) RETURNING id,email,role_id",
      [email, hashedPassword, roleId],
    );
    return user.rows[0];
  }
};

export const loginUserService = async (email, password) => {
  const result = await pool.query(
    `SELECT u.id,u.email,
    u.password,r.role_name FROM users u 
    JOIN roles r ON u.role_id = r.id 
    WHERE email = $1`,
    [email],
  );

  const user = result.rows[0];

  // user not found
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // password check
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  return {
    id: user.id,
    email: user.email,
    role: user.role_name,
  };
};
