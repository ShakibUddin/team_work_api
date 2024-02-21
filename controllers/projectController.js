const db = require("../models");
const { sequelize, Sequelize } = require("../models");
const { Project, Task, ProjectStatus, Invitation, User } = db;
const { Op, fn, col } = require("sequelize");
module.exports = {
  getAllProjects: async (req, res) => {
    try {
      const projects = await Project.findAll({
        attributes: [
          "id",
          "ownerId",
          "title",
          "description",
          "statusId",
          "createdAt",
          "updatedAt",
          [db.sequelize.fn("COUNT", db.sequelize.col("Tasks.id")), "taskCount"],
        ],
        include: [
          {
            model: Task,
            attributes: [],
          },
        ],
        group: ["Project.id"], // Corrected 'Projects' to 'Project'
      });
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
      const projectStatus = await ProjectStatus.findAll();
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
      const projects = await Project.findAll({
        attributes: [
          "id",
          "ownerId",
          "title",
          "description",
          "statusId",
          "createdAt",
          "updatedAt",
          [db.sequelize.fn("COUNT", db.sequelize.col("Tasks.id")), "taskCount"],
        ],
        include: [
          {
            model: Task,
            attributes: [],
          },
        ],
        group: ["Project.id"], // Corrected 'Projects' to 'Project'
        where: { ownerId },
      });
      if (projects) {
        return res.status(200).json({
          error: false,
          message: "Project found with ownerId " + ownerId,
          data: projects,
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
      const { title, description, ownerId, statusId } = req.body;
      if (!title) {
        return res.status(400).json({
          error: true,
          message: "Project title is required",
          data: null,
        });
      } else if (!description) {
        return res.status(400).json({
          error: true,
          message: "Project description is required",
          data: null,
        });
      } else if (!ownerId) {
        return res.status(400).json({
          error: true,
          message: "Project owner ID is required",
          data: null,
        });
      } else if (!statusId) {
        return res.status(400).json({
          error: true,
          message: "Project status is required",
          data: null,
        });
      }
      const existingProject = await Project.findOne({ where: { title } });
      if (existingProject) {
        return res.status(409).send({
          error: true,
          message: "Project " + title + " already exists",
          data: null,
        });
      } else {
        const project = await Project.create({
          title,
          description,
          ownerId,
          statusId,
        });
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

  createInvitation: async (req, res) => {
    try {
      const { projectId, userId } = req.body;
      await Invitation.create({
        projectId,
        userId,
      });
      return res.status(201).json({
        error: false,
        message: "Invitation sent successfully",
        data: null,
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

  getUsersToInviteToProject: async (req, res) => {
    const { searchKey, limit = 10, projectId } = req.query;
    try {
      const users = await User.findAll({
        where: {
          [Op.or]: [
            { firstName: { [Op.like]: fn("lower", "%" + searchKey + "%") } },
            { lastName: { [Op.like]: fn("lower", "%" + searchKey + "%") } },
          ].map((condition) => {
            const key = Object.keys(condition)[0];
            return Sequelize.where(fn("lower", col(key)), condition[key]);
          }),
        },
        limit: parseInt(limit),
      });

      if (users.length > 0) {
        const usersDataPromises = users.map(async (user) => {
          const invitationExists = await Invitation.findOne({
            where: {
              projectId: projectId,
              userId: user?.id,
            },
          });
          return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            avatar: user.avatar || "",
            invited: Boolean(invitationExists),
          };
        });
        const usersData = await Promise.all(usersDataPromises);
        message = "Users found";
        return res.status(200).json({
          error: false,
          message,
          data: usersData,
        });
      } else {
        message = "No users found";
        return res.status(200).json({
          error: true,
          message: message,
          data: [],
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
};
