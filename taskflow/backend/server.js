import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcryptjs";
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;
const SECRET_KEY = "taskflow_secret";

let users = [
  {
    id: "1772695136716",
    email: "riddhikmohite@gmail.com",
    password: "$2b$10$Bq.QzCma6bXPBi7D/Rb8FOtL1lAC5LzxDfCSAEb.TWHUkfFOaw1xW",
  },
];
let tasks = [
  {
    id: "1772696334308",
    title: "abc",
    completed: false,
    userId: "1772695136716",
  },
];

function authMiddleWare(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Split "Bearer <token>" and take the second part
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const userExists = users.find((user) => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now().toString(),
    email,
    password: hashedPassword,
  };

  users.push(newUser);
  res.json({ message: "User registered successfully" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Wrong Password" });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });

  const resUser = { id: user.id, email: user.email };
  res.json({ token, resUser });
});

app.post("/tasks", async (req, res) => {
  const { title, id } = req.body;

  const newTask = {
    id: Date.now().toString(),
    title,
    completed: false,
    userId: id,
  };

  tasks.push(newTask);
  res.json(newTask);
});

app.get("/tasks", async (req, res) => {
  const userTasks = tasks.filter((task) => task.userId === req.query.id);

  res.json(userTasks);
});

app.put("/tasks/:id", authMiddleWare, async (req, res) => {
  const taskId = req.params.id;
  const userId = req.query.id;

  const task = tasks.find(
    (task) => task.id === taskId && task.userId === userId,
  );

  if (!task) {
    return res.status(400).json("No tasks found");
  }

  task.title = req.body.title ?? task.title;
  task.completed = req.body.completed ?? task.completed;

  res.json(task);
});

app.delete("/tasks/:id", authMiddleWare, async (req, res) => {
  const taskId = req.params.id;
  const userId = req.query.id;
  tasks = tasks.filter(
    (task) => !(task.id === taskId && task.userId === userId),
  );

  res.json({ message: "Task deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
