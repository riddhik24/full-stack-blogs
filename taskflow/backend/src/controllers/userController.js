import { loginUserService, registerUserService } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const SECRET_KEY = process.env.SECRET_KEY || "taskflow_secret";

export const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const loginUser = async (req, res, next) => {
  //   console.log("Current req.body:", req);
  const { email, password } = req.body;
  try {
    const user = await loginUserService(email, password);
    // console.log(user);
    if (!user) {
      return handleResponse(res, 400, "User not found");
      // res.status(400).json({ message: "" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return handleResponse(res, 400, "Wrong Password");
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    const userResponse = { ...user };
    delete userResponse.password;
    return handleResponse(res, 201, "Logged in successfully", {
      user: userResponse,
      token,
    });
  } catch (err) {
    next(err);
  }
};

export const registerUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const newUser = await registerUserService(email, password);
    handleResponse(res, 201, "User registered successfully", newUser);
  } catch (err) {
    if (err.code === "23505") {
      return handleResponse(res, 409, "Email already registered");
    }
    next(err);
  }
};

// app.post("/register", async (req, res) => {
//   const { email, password } = req.body;

//   const userExists = users.find((user) => user.email === email);
//   if (userExists) {
//     return res.status(400).json({ message: "User already exists" });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const newUser = {
//     id: Date.now().toString(),
//     email,
//     password: hashedPassword,
//   };

//   users.push(newUser);
//   res.json({ message: "User registered successfully" });
// });

// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   const user = users.find((user) => user.email === email);

//   if (!user) {
//     return res.status(400).json({ message: "User not found" });
//   }

//   const isMatch = await bcrypt.compare(password, user.password);

//   if (!isMatch) {
//     return res.status(400).json({ message: "Wrong Password" });
//   }

//   const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
//     expiresIn: "1h",
//   });

//   const resUser = { id: user.id, email: user.email };
//   res.json({ token, resUser });
// });
