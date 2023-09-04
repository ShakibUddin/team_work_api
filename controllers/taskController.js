const { sequelize } = require("../models");
const Task = require("../models/task")(sequelize);

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json({ error: null, message: "All tasks", data: tasks });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({ title, description });
    console.log("task", task);
    if (task) {
      res.status(201).json({
        error: null,
        message: "Task added successfully",
        data: task,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.message });
  }
};

module.exports = {
  getAllTasks,
  createTask,
};
