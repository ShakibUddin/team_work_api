const express = require("express");
const {
  getAllTasks,
  createTask,
  updateTask,
  getTaskById,
  getAllTaskStatus,
} = require("../controllers/taskController");

const taskRouter = express.Router();

taskRouter.get("/all", getAllTasks);
taskRouter.get("/status/all", getAllTaskStatus);
taskRouter.post("/create", createTask);
taskRouter.put("/update", updateTask);
taskRouter.get("/details", getTaskById);

module.exports = taskRouter;
