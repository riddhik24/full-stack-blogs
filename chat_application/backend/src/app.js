import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { app } from "./utils/socket.js";
import errorHandling from "./middlewares/error.js";

import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.routes.js";
dotenv.config();
// const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(cookieParser());

app.use(errorHandling);

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);

export default app;
