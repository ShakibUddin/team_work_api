const express = require("express");
const {
  getAllProjects,
  createProject,
  updateProject,
  getProjectByOwnerId,
  getAllProjectStatus,
  createInvitation,
  getUsersToInviteToProject,
} = require("../controllers/projectController");

const projectRouter = express.Router();

projectRouter.get("/all", getAllProjects);
projectRouter.get("/status/all", getAllProjectStatus);
projectRouter.post("/create", createProject);
projectRouter.put("/update", updateProject);
projectRouter.get("/details", getProjectByOwnerId);
projectRouter.post("/invite", createInvitation);
projectRouter.post("/search/dev", getUsersToInviteToProject);

module.exports = projectRouter;
