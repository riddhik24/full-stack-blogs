import express from "express";
import {
  createTasks,
  deleteTasks,
  getTasks,
  updateTasks,
} from "../controllers/taskController.js";
import authMiddleWare from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/tasks/:id", getTasks);
router.post("/tasks", createTasks);
router.put("/tasks/:id", authMiddleWare, updateTasks);
router.delete("/tasks/:id", authMiddleWare, deleteTasks);

export default router;
