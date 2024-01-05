const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const db = require("./models");
const taskRouter = require("./routes/task");
const userRouter = require("./routes/user");
const verifyToken = require("./middlewares/auth");
const projectRouter = require("./routes/project");

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  db.sequelize.sync().then((req) => {
    console.log("Connected to DB");
  });
});

app.use("/task", verifyToken, taskRouter);
app.use("/user", userRouter);
app.use("/user/all", verifyToken, userRouter);
app.use("/project", verifyToken, projectRouter);
app.use("/", (req, res) => {
  return res.send("Hello");
});
