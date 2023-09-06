const { sequelize } = require("../models");
const Task = require("../models/task")(sequelize);

module.exports = {
  getAllTasks: async (req, res) => {
    try {
      const tasks = await Task.findAll();
      return res
        .status(200)
        .json({ error: false, message: "All tasks", data: tasks });
    } catch (err) {
      console.error(err);
      return res.status(500).send({
        error: true,
        message: err.message,
        data: null,
      });
    }
  },

  getTaskById: async (req, res) => {
    try {
      const { id } = req.query;
      const task = await Task.findByPk(id);
      if (task) {
        return res.status(200).json({
          error: false,
          message: "Task found with id " + id,
          data: task,
        });
      } else {
        return res.status(404).json({
          error: true,
          message: "No task found with id " + id,
          data: null,
        });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send({
        error: true,
        message: err.message,
        data: null,
      });
    }
  },

  createTask: async (req, res) => {
    try {
      const { title, description } = req.body;
      const task = await Task.create({ title, description });
      if (task) {
        return res.status(201).json({
          error: false,
          message: "Task added successfully",
          data: task,
        });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send({
        error: true,
        message: err.message,
        data: null,
      });
    }
  },

  updateTask: async (req, res) => {
    try {
      const { id } = req.query;
      if (!req.body.title && !req.body.description && !req.body.complete) {
        return res.status(400).send({
          error: true,
          message: "Invalid parameters",
          data: null,
        });
      } else {
        const task = await Task.findByPk(id);
        if (task === null) {
          return res.status(404).json({
            error: true,
            message: "No task found with id " + id,
            data: null,
          });
        } else {
          const task = await Task.update(req.body, {
            where: {
              id,
            },
          });
          console.log("task", task);
          return res.status(200).json({
            error: false,
            message: "Task updated successfully",
            data: null,
          });
        }
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send({
        error: true,
        message: err.message,
        data: null,
      });
    }
  },
};
