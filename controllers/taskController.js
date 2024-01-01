const db = require("../models");
const { Project, Task, TaskStatus } = db;

module.exports = {
  getAllTasks: async (req, res) => {
    try {
      const tasks = await Task.findAll();
      if (tasks.length > 0) {
        message = "Tasks found";
        return res.status(200).json({
          error: false,
          message,
          data: tasks,
        });
      } else {
        message = "No tasks found";
        return res.status(404).json({
          error: true,
          message: message,
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

  getAllTaskStatus: async (req, res) => {
    try {
      const taskStatus = await TaskStatus.findAll();
      return res.status(200).json({
        error: false,
        message: "All task statuses",
        data: taskStatus,
      });
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
      const { taskId, projectId } = req.query;
      let tasks = [];
      let message = "";
      if (taskId && projectId) {
        tasks = await Task.findAll({
          where: {
            projectId,
            id: taskId,
          },
        });
        if (tasks.length > 0) {
          message =
            "Tasks found with projectId " + projectId + " and taskId " + taskId;
          return res.status(200).json({
            error: false,
            message,
            data: tasks,
          });
        } else {
          message =
            "No tasks found with projectId " +
            projectId +
            " and taskId " +
            taskId;
          return res.status(404).json({
            error: true,
            message: message,
            data: null,
          });
        }
      } else if (taskId) {
        tasks = await Task.findByPk(taskId);
        if (tasks) {
          message = "Tasks found with taskId " + taskId;
          return res.status(200).json({
            error: false,
            message,
            data: tasks,
          });
        } else {
          message = "No tasks found with taskId " + taskId;
          return res.status(404).json({
            error: true,
            message: message,
            data: null,
          });
        }
      } else if (projectId) {
        tasks = await Task.findAll({
          where: {
            projectId,
          },
        });
        if (tasks) {
          message = "Tasks found with projectId " + projectId;
          return res.status(200).json({
            error: false,
            message,
            data: tasks,
          });
        } else {
          message = "No tasks found with projectId " + projectId;
          return res.status(404).json({
            error: true,
            message: message,
            data: null,
          });
        }
      } else {
        message = "ProjectId or taskId is required";
        return res.status(400).json({
          error: false,
          message,
          data: tasks,
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
  getTaskByProjectId: async (req, res) => {
    try {
      const { projectId } = req.query;
      const tasks = await Task.findAll({
        where: {
          projectId,
        },
      });
      if (tasks) {
        return res.status(200).json({
          error: false,
          message: "Task found with project id " + projectId,
          data: tasks,
        });
      } else {
        return res.status(404).json({
          error: true,
          message: "No task found with project id " + projectId,
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
      const { title, description, projectId, statusId } = req.body;
      const project = await Project.findByPk(projectId);
      if (!project) {
        return res.status(404).json({
          error: true,
          message: "No project found with project id " + projectId,
          data: null,
        });
      } else {
        const task = await Task.create({
          title,
          description,
          projectId,
          statusId,
        });

        if (task) {
          return res.status(201).json({
            error: false,
            message: "Task added successfully",
            data: task,
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
