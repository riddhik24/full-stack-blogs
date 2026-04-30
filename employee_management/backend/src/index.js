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
import userRoutes from "./routes/user.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import departmentRoutes from "./routes/department.routes.js";
import payrollRoutes from "./routes/payroll.routes.js";
import leaveRequestRoutes from "./routes/leaveRequest.routes.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(errorHandling);
const PORT = process.env.PORT || 5000;

createDepartmentTable();
createRolesTable();
createUsersTable();
createEmployeeTable();
createAttendanceTable();
createLeaveRequestTable();
createPayrollTable();

app.get("/", async (req, res) => {
  const result = await pool.query("SELECT current_database()");
  // console.log(result.rows);
  res.send(`The databse name is ${result.rows[0].current_database}`);
});

//routes
app.use("/api", userRoutes);
app.use("/api", departmentRoutes);
app.use("/api", attendanceRoutes);
app.use("/api", employeeRoutes);
app.use("/api", leaveRequestRoutes);
app.use("/api", payrollRoutes);
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
