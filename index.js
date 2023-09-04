const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const db = require("./models");
const taskRouter = require("./routes/task");

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  db.sequelize.sync().then((req) => {
    console.log("Connected to DB");
  });
});

app.use("/tasks", taskRouter);
app.use("/", (req, res) => {
  res.send("Hello");
});
