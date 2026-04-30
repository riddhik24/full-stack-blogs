import express from "express";
import {
  createDepartment,
  deleteDepartment,
  getDepartment,
  updateDepartment,
} from "../controllers/department.controller.js";

const router = express.Router();

router.route("/department/:id").put(updateDepartment);
router.route("/department/:id").delete(deleteDepartment);
router.route("/department").get(getDepartment);
router.route("/department").post(createDepartment);

export default router;
