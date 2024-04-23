const express = require("express");
const prisma = require("../database");
const {
  getAllStudents,
  getStudentById,
  addStudent,
  deleteStudentById,
  editStudentById,
} = require("./students.service");

const router = express.Router();

//GET Students
router.get("/", async (req, res) => {
  try {
    const result = await getAllStudents();
    console.log(result);
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//GET Students by ID
router.get("/:id", async (req, res) => {
  try {
    const idStudent = parseInt(req.params.id);
    const student = await getStudentById(idStudent);

    res.send(student);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//POST Students
router.post("/", async (req, res) => {
  try {
    const newStudent = req.body;

    const student = await addStudent(newStudent);

    res.send({
      data: student,
      message: "Student baru berhasil dibuat",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//PUT Students by ID
router.put("/:id", async (req, res) => {
  const idStudent = req.params.id;
  const studentData = req.body;

  if (!(studentData.name && studentData.address)) {
    return res.status(400).send("Some fields are missing");
  }
  const student = await editStudentById(parseInt(idStudent), studentData);

  res.send({
    data: student,
    message: "Student berhasil di edit",
  });
});

//PATCH Students by ID
router.patch("/:id", async (req, res) => {
  try {
    const idStudent = req.params.id;
    const studentData = req.body;

    const student = await editStudentById(parseInt(idStudent), studentData);

    res.send({
      data: student,
      message: "Student berhasil di edit",
    });
  } catch (error) {
    res.status(400).send("err.message");
  }
});

//DELETE Students by id
router.delete("/:id", async (req, res) => {
  try {
    const idStudent = req.params.id;

    await deleteStudentById(parseInt(idStudent));

    res.send("Student berhasil dihapus");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;