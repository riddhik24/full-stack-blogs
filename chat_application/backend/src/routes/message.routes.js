import express from "express";
import auth from "../middlewares/auth.js";
import {
  getMessage,
  getUserForSlider,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.route("/friends").get(auth, getUserForSlider);
router.route("/:id").get(auth, getMessage);
router.route("/send/:id").post(auth, sendMessage);

export default router;
