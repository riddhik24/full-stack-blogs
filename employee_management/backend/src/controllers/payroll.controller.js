import handleResponse from "../middlewares/handleResponse.js";
import {
  createPayrollService,
  getPayrollByEmployeeIdService,
} from "../models/payroll.model.js";

const createPayroll = async (req, res, next) => {
  const { employee_id, basic_salary, bonus, deductions, salary_month } =
    req.body;

  if (!employee_id) return handleResponse(res, 400, "Employee id is required.");
  if (!basic_salary || !bonus || !deductions || !salary_month)
    return handleResponse(res, 400, "All fields are required.");

  try {
    const payroll = await createPayrollService(
      employee_id,
      basic_salary,
      bonus,
      deductions,
      salary_month,
    );

    return handleResponse(res, 200, "Payroll created succesfully", payroll);
  } catch (err) {
    next(err);
  }
};

const getPayrollByEmployeeId = async (req, res, next) => {
  const { id } = req.params;

  if (!id) return handleResponse(res, 400, "Employee id is required.");

  try {
    const payroll = await getPayrollByEmployeeIdService(id);

    return handleResponse(res, 200, "Fetched employee payroll", payroll);
  } catch (err) {
    next(err);
  }
};

export { createPayroll, getPayrollByEmployeeId };
