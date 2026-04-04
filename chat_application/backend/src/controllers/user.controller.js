import uploadImage from "../utils/cloudinary.js";
import generateToken from "../utils/token.js";
import User from "../models/user.model.js";

export const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const register = async (req, res) => {
  try {
    const { fullName, userName, email, password } = req.body;

    if ((!fullName || !userName, !email, !password)) {
      //   return res.status(400).json({ message: "Please fill in all the fields" });
      return handleResponse(res, 400, "Please fill in all the fields");
    }

    const alreadyExists = await User.findOne({ email });

    if (alreadyExists) {
      //   return res
      //     .status(400)
      //     .json({ message: "User with this email already exists" });
      return handleResponse(res, 400, "User with this email already exists");
    }

    const user = await User.create({
      fullName,
      userName,
      email,
      password,
    });

    if (!user) {
      //   return res.status(500).json({ message: "Problem in creating user" });
      return handleResponse(res, 500, "Problem in creating user");
    }

    const token = generateToken(user._id, res);

    // res.status(201).json({
    //     // userCreated: user,

    // })
    handleResponse(res, 201, "User created", user);
  } catch (err) {
    // next(err);
    console.error(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return handleResponse(res, 400, "Please fill in all the details");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return handleResponse(res, 400, "User not found");
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return handleResponse(res, 400, "Invalid credentials");
    }

    generateToken(user._id, res);

    handleResponse(res, 200, "Login successful");
  } catch (err) {
    next(err);
  }
};

export const profileUpdate = async (req, res, next) => {
  try {
    const avatar = req.file.destination + "/" + req.file.filename;

    if (!avatar) {
      return handleResponse(res, 400, "Please fill in all details");
    }

    const image = await uploadImage(avatar);

    if (!image) {
      return handleResponse(res, 500, "Image upload failed");
    }

    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { avatar: image },
      { new: true },
    );

    if (!user) {
      return handleResponse(res, 400, "User not found");
    }

    handleResponse(res, 200, "Profile updated successfully", user);
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("JWT", { httpOnly: true, sameSite: "none", secure: true });

    handleResponse(res, 200, "Logout successful");
  } catch (err) {
    next(err);
  }
};

export const authUser = async (req, res, next) => {
  try {
    handleResponse(res, 200, "", req.user);
  } catch (err) {
    next(err);
  }
};
