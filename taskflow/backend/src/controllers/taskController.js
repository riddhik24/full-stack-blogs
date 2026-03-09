import {
  createTaskService,
  deleteTaskService,
  getTaskService,
  updateTaskService,
} from "../models/taskModel.js";
import { handleResponse } from "./userController.js";

export const getTasks = async (req, res, next) => {
  // const {userId} = req.body;
  try {
    const tasks = await getTaskService(req.params.id);
    handleResponse(res, 201, "Tasks fetched successfully", tasks);
  } catch (err) {
    next(err);
  }
};
export const createTasks = async (req, res, next) => {
  const { title, userId } = req.body;
  try {
    const newTask = await createTaskService(title, userId);
    handleResponse(res, 201, "Task created successfully", newTask);
  } catch (err) {
    next(err);
  }
};
export const updateTasks = async (req, res, next) => {
  const taskId = req.params.id;

  const { title, completed, userId } = req.body;

  try {
    const updatedTask = await updateTaskService(
      taskId,
      title,
      completed,
      userId,
    );

    if (!updatedTask) {
      return handleResponse(res, 404, "Task not found or unauthorized");
    }

    handleResponse(res, 200, "Task updated successfully", updatedTask);
  } catch (err) {
    next(err);
  }
};
export const deleteTasks = async (req, res, next) => {
  // const userId = req.user.id;
  try {
    const deletedTask = await deleteTaskService(req.params.id);

    if (!deletedTask) {
      return handleResponse(res, 404, "Task not found");
    }
    handleResponse(res, 201, "Task deleted successfully", deletedTask);
  } catch (err) {
    next(err);
  }
};

// app.post("/tasks", async (req, res) => {
//   const { title, id } = req.body;

//   const newTask = {
//     id: Date.now().toString(),
//     title,
//     completed: false,
//     userId: id,
//   };

//   tasks.push(newTask);
//   res.json(newTask);
// });

// app.get("/tasks", async (req, res) => {
//   const userTasks = tasks.filter((task) => task.userId === req.query.id);

//   res.json(userTasks);
// });

// app.put("/tasks/:id", authMiddleWare, async (req, res) => {
//   const taskId = req.params.id;
//   const userId = req.query.id;

//   const task = tasks.find(
//     (task) => task.id === taskId && task.userId === userId,
//   );

//   if (!task) {
//     return res.status(400).json("No tasks found");
//   }

//   task.title = req.body.title ?? task.title;
//   task.completed = req.body.completed ?? task.completed;

//   res.json(task);
// });

// app.delete("/tasks/:id", authMiddleWare, async (req, res) => {
//   const taskId = req.params.id;
//   const userId = req.query.id;
//   tasks = tasks.filter(
//     (task) => !(task.id === taskId && task.userId === userId),
//   );

//   res.json({ message: "Task deleted" });
// });
