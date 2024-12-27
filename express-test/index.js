const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
const port = process.env.port || 4000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "data.db",
});

// Define the Todo model

const Todo = sequelize.define("Todo", {
  task: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sync the database
sequelize.sync();

app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/todos", async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
