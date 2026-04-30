import express from "express";
import {
  createPayroll,
  getPayrollByEmployeeId,
} from "../controllers/payroll.controller.js";

const router = express.Router();

router.route("/payroll").post(createPayroll);
router.route("/payroll/:id").get(getPayrollByEmployeeId);

export default router;
