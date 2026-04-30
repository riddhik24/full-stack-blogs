import express from "express";
import {
  applyLeave,
  updateLeaveStatus,
} from "../controllers/leaveRequest.controller.js";

const router = express.Router();

router.route("/leave").post(applyLeave);
router.route("/leave/:id").put(updateLeaveStatus);

export default router;
