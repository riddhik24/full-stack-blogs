import jwt, { decode } from "jsonwebtoken";
import User from "../models/user.model.js";

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.JWT;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - no token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({ message: "Unauthorized - invalid token" });
    }

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized - no user found" });
    }

    req.user = user;

    next();
  } catch (err) {
    console.error("Auth error", err);
    res.status(500).json({ message: "Unauthorized - invalid token" });
  }
};

export default auth;
