import express from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";
import authMiddleWare from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/register").post(authMiddleWare, registerUser);
router.route("/login").post(authMiddleWare, loginUser);

export default router;
