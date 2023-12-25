const { sequelize } = require("../models");
const Project = require("../models/project")(sequelize);
const Status = require("../models/projectStatus")(sequelize);

module.exports = {
  getAllProjects: async (req, res) => {
    try {
      const projects = await Project.findAll();
      return res
        .status(200)
        .json({ error: false, message: "All projects", data: projects });
    } catch (err) {
      console.error(err);
      return res.status(500).send({
        error: true,
        message: err.message,
        data: null,
      });
    }
  },

  getAllProjectStatus: async (req, res) => {
    try {
      const projectStatus = await Status.findAll();
      return res.status(200).json({
        error: false,
        message: "All project statuses",
        data: projectStatus,
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

  getProjectByOwnerId: async (req, res) => {
    try {
      const { ownerId } = req.query;
      const project = await Project.findAll({ where: { ownerId } });
      if (project) {
        return res.status(200).json({
          error: false,
          message: "Project found with ownerId " + ownerId,
          data: project,
        });
      } else {
        return res.status(404).json({
          error: true,
          message: "No project found with ownerId " + ownerId,
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

  createProject: async (req, res) => {
    try {
      const { title, description, ownerId } = req.body;
      const existingProject = await Project.findOne({ where: { title } });
      if (existingProject) {
        return res.status(409).send({
          error: true,
          message: "Project " + title + " already exists",
          data: null,
        });
      } else {
        const project = await Project.create({ title, description, ownerId });
        if (project) {
          return res.status(201).json({
            error: false,
            message: "Project added successfully",
            data: project,
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

  updateProject: async (req, res) => {
    try {
      const { id } = req.query;
      if (!req.body.title && !req.body.description && !req.body.complete) {
        return res.status(400).send({
          error: true,
          message: "Invalid parameters",
          data: null,
        });
      } else {
        const project = await Project.findByPk(id);
        if (project === null) {
          return res.status(404).json({
            error: true,
            message: "No project found with id " + id,
            data: null,
          });
        } else {
          const project = await Project.update(req.body, {
            where: {
              id,
            },
          });
          return res.status(200).json({
            error: false,
            message: "Project updated successfully",
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
