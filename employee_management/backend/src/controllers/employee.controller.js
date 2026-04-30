import {
  createEmployeeService,
  deleteEmployeeService,
  getAllEmployeesService,
  getEmployeeByDepartmentService,
  getEmployeeByIdService,
  updateEmployeeService,
} from "../models/employee.model.js";
import handleResponse from "../middlewares/handleResponse.js";
const createEmployee = async (req, res, next) => {
  const {
    first_name,
    last_name,
    phone,
    department,
    position,
    joining_date,
    salary,
  } = req.body;
  try {
    const employee = await createEmployeeService(
      first_name,
      last_name,
      phone,
      department,
      position,
      joining_date,
      salary,
    );

    if (
      !first_name ||
      !last_name ||
      !phone ||
      !department ||
      !position ||
      !joining_date ||
      !salary
    ) {
      return handleResponse(res, 400, "All details are required.", employee);
    }
    return handleResponse(res, 200, "Employee created succesfully.", employee);
  } catch (err) {
    next(err);
  }
};

const getEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) return handleResponse(res, 400, "Id is required");
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

    if (!department) return handleResponse(res, 400, "Department is required");
    const employee = await getEmployeeByDepartmentService(department);

    return handleResponse(res, 200, "Employees fetched successful", employee);
  } catch (err) {
    next(err);
  }
};

const updateEmployee = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return handleResponse(res, 400, "Employee id is required");

  const employee = await getEmployeeByIdService(id);

  if (!employee) {
    return handleResponse(res, 400, "Employee not found");
  }
  const { first_name, last_name, phone, department_id, position, salary } =
    req.body;

  // if (
  //   !first_name ||
  //   !last_name ||
  //   !phone ||
  //   !department_id ||
  //   !position ||
  //   !salary
  // ) return handleResponse(res,400,"All fields are re")
  try {
    const updatedEmployee = await updateEmployeeService();
    return handleResponse(
      res,
      200,
      "Employee updated successfully",
      updatedEmployee,
    );
  } catch (err) {
    next(err);
  }
};

const deleteEmployee = async (req, res, next) => {
  const { id } = req.params;

  if (!id) return handleResponse(res, 400, "Employee id is required.");
  const employee = await getEmployeeByIdService(id);
  if (!employee) {
    return handleResponse(res, 400, "Employee not found");
  }

  try {
    const deletedEmployee = await deleteEmployeeService(id);
    return handleResponse(res, 200, "Employee deleted successfully");
  } catch (err) {
    next(err);
  }
};
export {
  updateEmployee,
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  getEmployeeByDepartment,
  deleteEmployee,
};
