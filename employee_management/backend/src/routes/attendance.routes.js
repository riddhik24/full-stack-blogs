import express from "express";
import {
  checkIn,
  checkOut,
  getAttendanceById,
} from "../controllers/attendance.controller.js";

const router = express.Router();

router.route("/attendance/:id").get(getAttendanceById);
router.route("/attendance/:id").post(checkIn);
router.route("/attendance/:id").post(checkOut);

export default router;
