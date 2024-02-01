const express = require("express");
const {
  getAllTasks,
  createTask,
  updateTask,
  getTaskById,
  getAllTaskStatus,
  getTaskByProjectId,
  getAllTaskPriorities,
  addComment,
  getCommentByTaskId,
} = require("../controllers/taskController");

const taskRouter = express.Router();

taskRouter.get("/all", getAllTasks);
taskRouter.get("/status/all", getAllTaskStatus);
taskRouter.get("/priorities/all", getAllTaskPriorities);
taskRouter.post("/create", createTask);
taskRouter.put("/update", updateTask);
taskRouter.get("/details", getTaskById);
taskRouter.get("/project", getTaskByProjectId);
taskRouter.post("/comment/add", addComment);
taskRouter.get("/comment", getCommentByTaskId);

module.exports = taskRouter;
