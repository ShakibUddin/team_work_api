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

// app.get("/task/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const task = await db.query("SELECT * FROM tasks where id = $1", [id]);
//     res
//       .status(200)
//       .json({ error: null, message: "All tasks", data: task.rows });
//   } catch (error) {
//     console.log("error", error.message);
//     res.status(500).send({ error: error.message });
//   }
// });

// app.put("/task/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, description, complete } = req.body;
//     const columns = [];
//     const values = [];

//     const task = await db.query("SELECT * FROM tasks where id = $1", [id]);
//     console.log("task", task);
//     if (task.rows.length === 0) {
//       res.status(404).json({
//         error: true,
//         message: "No task found with id " + id,
//         data: null,
//       });
//     } else {
//       if (title) {
//         columns.push("title");
//         values.push(title);
//       }
//       if (description) {
//         columns.push("description");
//         values.push(description);
//       }
//       if (complete) {
//         columns.push("complete");
//         values.push(complete);
//       }
//       const query = `UPDATE tasks SET ${columns
//         .map((column, i) => `${column} = $${i + 1}`)
//         .join(", ")} WHERE id = ${id}`;
//       const response = await db.query(query, values);
//       res.status(200).json({
//         error: null,
//         message: "Task updated successfully",
//         data: null,
//       });
//     }
//   } catch (error) {
//     console.log("error", error.message);
//     res.status(500).send({ error: error.message });
//   }
// });
