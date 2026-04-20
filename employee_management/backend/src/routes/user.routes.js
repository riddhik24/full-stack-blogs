import express from "express";
import { registerUserService, loginUserService } from "../models/user.model";

const router = express.Router();

router.route("/register").post(registerUserService);
router.route("/login").post(loginUserService);

export default router;
