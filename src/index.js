const express = require("express");
const app = express();
const PORT = 3200;
const db = require("../db");

app.use(express.json());

const studentsController = require("./students/students.controller");

app.use("/students", studentsController);

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);