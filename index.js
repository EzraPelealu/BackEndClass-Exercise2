const express = require("express");

const app = express();
const port = 3000;
const db = require("./db");
const { Pool } = require("pg");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/*--------------------------*/

app.get("/students", async (req, res) => {
  try {
    // const result = await db.query("SELECT * FROM students");
    const allStudent = await prisma.students.findMany();
    // console.log(allStudent);
    res.status(200).json({
      status: "success",
      data: allStudent,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/students", async (req, res) => {
  try {
    const { name, address } = req.body;
    
    await prisma.students.create({
      data: {
        name: name,
        address: address,
      },
    });
    res.status(200).json({
      status: "success",
      message: "data student berhasil dimasukan",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Get student by ID
app.get("/students/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const student = await prisma.students.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!student) {
      res.status(404).json({
        message: "Data student tidak ditemukan",
      });
    } else {
      res.status(200).json({
        status: "success",
        data: student,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal Server Error");
  }
});

// Update Student by ID
app.put("/students/:id", async (req, res) => {
  const { id } = req.params;
  const { name, address } = req.body;

  try {
    await prisma.students.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: name,
        address: address,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Data student berhasil diperbarui",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Delete student by ID
app.delete("/students/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.students.deleteMany({
      where: {
        id: parseInt(id),
      },
    });

     res.status(200).json({
      status: "success",
      message: "Data student berhasil dihapus",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
/*---------------------------*/


app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);