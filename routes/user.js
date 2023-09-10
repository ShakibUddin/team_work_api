const express = require("express");
const {
  createUser,
  loginUser,
  logoutUser,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logoutUser);

module.exports = userRouter;
