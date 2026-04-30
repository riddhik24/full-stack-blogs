import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployeeByDepartment,
  getEmployeeById,
  updateEmployee,
} from "../controllers/employee.controller.js";

const router = express.Router();

router.route("/employee").post(createEmployee);
router.route("/employee").get(getAllEmployees);
router.route("/employee/:id").get(getEmployeeById);
router.route("/employee/:department").get(getEmployeeByDepartment);
router.route("/employee/:id").put(updateEmployee);
router.route("/employee/:id").delete(deleteEmployee);

export default router;
