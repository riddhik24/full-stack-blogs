import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import pool from "./config/db.js";

import errorHandling from "./middlewares/errorHandler.js";

import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

import createUserTable from "./data/createUserTable.js";
import createTaskTable from "./data/createTaskTable.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5001;
const SECRET_KEY = process.env.SECRET_KEY || "taskflow_secret";

//error handling middleware
app.use(errorHandling);

//create table if not exists
createUserTable();
createTaskTable();

// postgres connection
app.get("/", async (req, res) => {
  const result = await pool.query("SELECT current_database()");
  // console.log(result.rows);
  res.send(`The databse name is ${result.rows[0].current_database}`);
});

//routes
app.use("/api", userRoutes);
app.use("/api", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
