import handleResponse from "../middlewares/handleResponse.js";
import {
  checkInService,
  checkOutService,
  getAttendanceByIdService,
} from "../models/attendance.model.js";

const getAttendanceById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const attendance = await getAttendanceByIdService(id);
    if (!attendance) return handleResponse(res, 400, "No attendance found");
    return handleResponse(
      res,
      200,
      "Attendance fetched successfully",
      attendance,
    );
  } catch (err) {
    next(err);
  }
};

const checkIn = async (req, res, next) => {
  const { id } = req.params;

  if (!id) return handleResponse(res, 400, "Employee id is required.");
  try {
    const check_in = await checkInService(id);
    return handleResponse(res, 200, "Check in successful", check_in);
  } catch (err) {
    next(err);
  }
};

const checkOut = async (req, res, next) => {
  const { id } = req.params;

  if (!id) return handleResponse(res, 400, "Employee id is required.");

  try {
    const check_out = await checkOutService(id);
    return handleResponse(res, 200, "Check out successful", check_out);
  } catch (err) {
    next(err);
  }
};

export { getAttendanceById, checkIn, checkOut };
