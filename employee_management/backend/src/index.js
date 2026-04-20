import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import errorHandling from "./middlewares/errorHandler.js";
import pool from "./config/db.js";
import createRolesTable from "./data/createRolesTable.js";
import createUsersTable from "./data/createUsersTable.js";
import createDepartmentTable from "./data/createDepartmentTable.js";
import createEmployeeTable from "./data/createEmployeeTable.js";
import createAttendanceTable from "./data/createAttendanceTable.js";
import createLeaveRequestTable from "./data/createLeaveRequestTable.js";
import createPayrollTable from "./data/createPayrollTable.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(errorHandling);
const PORT = process.env.PORT || 5000;

createRolesTable();
createUsersTable();
createDepartmentTable();
createEmployeeTable();
createAttendanceTable();
createLeaveRequestTable();
createPayrollTable();

app.get("/", async (req, res) => {
  const result = await pool.query("SELECT current_database()");
  // console.log(result.rows);
  res.send(`The databse name is ${result.rows[0].current_database}`);
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
