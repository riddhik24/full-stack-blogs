import handleResponse from "../middlewares/handleResponse.js";
import { loginUserService, registerUserService } from "../models/user.model.js";
import generateToken from "../middlewares/generateToken.js";
const registerUser = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return handleResponse(res, 400, "Email and Password are required.");
    }

    const user = await registerUserService(email, password, role);

    return handleResponse(res, 200, "Succesfully registered.", user);
  } catch (err) {
    next(err);
  }
};
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return handleResponse(res, 400, "Email and Password are required.");
    }
    const user = await loginUserService(email, password);

    generateToken(user.id, user.role_name, res);

    return handleResponse(res, 200, "Login Successfull.", user);
  } catch (err) {
    next(err);
  }
};

export { loginUser, registerUser };
