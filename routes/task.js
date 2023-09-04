const express = require("express");
const { getAllTasks, createTask } = require("../controllers/taskController");

const taskRouter = express.Router();

taskRouter.get("/all", getAllTasks);
taskRouter.post("/create", createTask);

module.exports = taskRouter;
