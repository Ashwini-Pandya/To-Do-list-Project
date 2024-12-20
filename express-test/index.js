const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = process.env.port || 4000;

app.use(cors());
app.use(express.json());

const database = new sqlite3.Database("./data.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database");
    database.run(
      `
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL
      )
    `,
      (err) => {
        if (err) {
          console.error("Error creating table:", err.message);
        } else {
          console.log("Tasks table initialized.");
        }
      }
    );
  }
});

let tasks = [
  {
    task: "wake up early",
  },
];

app.get("/tasks", (req, res) => {
  res.json(tasks);
  console.log(tasks);
});

app.post("/add-task", (req, res) => {
  const newTask = req.body.task;
  tasks.push(newTask);
  res.json({ message: "Your task was added successfully!" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
