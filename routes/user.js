const express = require("express");
const {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logoutUser);
userRouter.get("/users", getAllUsers);
module.exports = userRouter;
