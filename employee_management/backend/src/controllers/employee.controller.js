import {
  createEmployeeService,
  getAllEmployeesService,
  getEmployeeByDepartmentService,
  getEmployeeByIdService,
  updateEmployeeService,
} from "../models/employee.model.js";
import handleResponse from "../middlewares/handleResponse.js";
const createEmployee = async (req, res, next) => {
  try {
    const {
      first_name,
      last_name,
      phone,
      department,
      position,
      joining_date,
      salary,
    } = req.body;

    const employee = await createEmployeeService(
      first_name,
      last_name,
      phone,
      department,
      position,
      joining_date,
      salary,
    );

    return handleResponse(res, 200, "Employee created succesfully.", employee);
  } catch (err) {
    next(err);
  }
};

const getEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const employee = await getEmployeeByIdService(id);

    return handleResponse(res, 200, "Employee fetched succesfull.", employee);
  } catch (err) {
    next(err);
  }
};

const getAllEmployees = async (req, res, next) => {
  try {
    const employees = await getAllEmployeesService();
    return handleResponse(
      res,
      200,
      "Employees fetched succesfully.",
      employees,
    );
  } catch (err) {
    next(err);
  }
};

const getEmployeeByDepartment = async (req, res, next) => {
  try {
    const { department } = req.params;
    const employee = await getEmployeeByDepartmentService(department);

    return handleResponse(res, 200, "Employees fetched successful", employee);
  } catch (err) {
    next(err);
  }
};

const updateEmployee = async (req, res, next) => {
  const { id } = req.params;

  const employee = await getEmployeeByIdService(id);

  if (!employee) {
    return handleResponse(res, 400, "Employee not found");
  }
  const { first_name, last_name, phone, department_id, position, salary } =
    req.body;

  try {
    const updatedEmployee = await updateEmployeeService();
  } catch (err) {
    next(err);
  }
};
