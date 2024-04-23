const prisma = require("../database");
const {
  findStudents,
  findStudentById,
  insertStudent,
  deleteStudent,
  editStudent,
} = require("./students.repository");

const getAllStudents = async () => {
  const student = await findStudents();
  return student;
};

const getStudentById = async (id) => {
  const student = await findStudentById(id);

  if (!student) {
    throw new Error("Student tidak ditemukan");
  }
  return student;
};

const addStudent = async (newStudent) => {
  const student = await insertStudent(newStudent);

  return student;
};

const deleteStudentById = async (id) => {
  await getStudentById(id);

  await deleteStudent(id);
};

const editStudentById = async (id, studentData) => {
  await getStudentById(id);

  const student = await editStudent(id, studentData);
  return student;
};

module.exports = {
  getAllStudents,
  getStudentById,
  addStudent,
  deleteStudentById,
  editStudentById,
};