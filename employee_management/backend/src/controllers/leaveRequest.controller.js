import handleResponse from "../middlewares/handleResponse.js";
import {
  applyLeaveService,
  updateLeaveStatusService,
} from "../models/leaveRequest.model.js";

const applyLeave = async (req, res, next) => {
  const { employee_id, leave_type, start_date, end_date, reason } = req.body;

  if ((!employee_id, !leave_type, !start_date, !end_date, !reason))
    return handleResponse(res, 400, "All fields are required.");
  try {
    const leave = await applyLeaveService(
      employee_id,
      leave_type,
      start_date,
      end_date,
      reason,
    );

    return handleResponse(res, 200, "Leave request raised succesfully", leave);
  } catch (err) {
    next(err);
  }
};

const updateLeaveStatus = async (req, res, next) => {
  const { status } = req.body;
  const { id } = req.body;

  if (!status || !id)
    return handleResponse(res, 400, "Status and id are required.");
  try {
    const leave = await updateLeaveStatusService(id, status);

    return handleResponse(
      res,
      200,
      "Leave request status updated successfully.",
    );
  } catch (err) {
    next(err);
  }
};

export { applyLeave, updateLeaveStatus };
