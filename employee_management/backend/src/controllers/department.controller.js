import handleResponse from "../middlewares/handleResponse.js";
import {
  createDepartmentService,
  deleteDepartmentService,
  getDepartmentService,
  updateDepartmentService,
} from "../models/department.model.js";

const createDepartment = async (req, res, next) => {
  const { name } = req.body;

  if (!name) return handleResponse(res, 400, "Department name is required.");

  try {
    const department = await createDepartmentService(name);
    return handleResponse(
      res,
      200,
      "Department created successfully",
      department,
    );
  } catch (err) {
    next(err);
  }
};

const getDepartment = async (req, res, next) => {
  try {
    const department = await getDepartmentService();
    return handleResponse(
      res,
      200,
      "Departments fetched successfully",
      department,
    );
  } catch (err) {
    next(err);
  }
};

const updateDepartment = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name || !id)
    return handleResponse(res, 400, "Department name and Id is required.");

  try {
    const department = await updateDepartmentService(id, name);
    return handleResponse(res, 200, "Department updated successfully");
  } catch (err) {
    next(err);
  }
};

const deleteDepartment = async (req, res, next) => {
  const { id } = req.params;

  if (!id) return handleResponse(res, 400, "Department id is required.");

  try {
    const department = await deleteDepartmentService(id);
    return handleResponse(res, 200, "Department deleted successfully");
  } catch (err) {
    next(err);
  }
};

export { createDepartment, getDepartment, updateDepartment, deleteDepartment };
