const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const db = require("./models");
const taskRouter = require("./routes/task");
const userRouter = require("./routes/user");
const verifyToken = require("./middlewares/auth");
const projectRouter = require("./routes/project");
const limiter = require("./middlewares/rateLimiter");

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  db.sequelize.sync().then((req) => {
    console.log("Connected to DB");
  });
});

app.use("/task", verifyToken, limiter, taskRouter);
app.use("/user", limiter, userRouter);
app.use("/user/all", verifyToken, limiter, userRouter);
app.use("/project", verifyToken, limiter, projectRouter);
app.use("/", (req, res) => {
  return res.send("Hello");
});
