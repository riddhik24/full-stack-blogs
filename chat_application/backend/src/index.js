import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import { server } from "./utils/socket.js";
import app from "./app.js";

dotenv.config();
const PORT = process.env.PORT;
// const app = express();

// app.use(express.json());
// app.use(cors());

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("error in connecting database", error);
  });
