const express = require("express");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const isAdmin = require("../../middlewares/isAdmin");
const isStudentLoggedIn = require("../../middlewares/isStudent");
const isStudent = require("../../middlewares/isStudent");
const {
  adminRegisterStudent,
  loginStudent,
  getAllStudentsAdmin,
  getSingleStudentByAdminController,
  getStudentProfileController,
  studentUpdateProfileController,
  adminUpdateStudentController,
  writingExam,
} = require("../../controllers/students/studentController");

const studentRouter = express.Router();

studentRouter.post(
  "/admin/register",
  isLoggedIn,
  isAdmin,
  adminRegisterStudent
);

studentRouter.post("/login", loginStudent);

studentRouter.get("/admin", isLoggedIn, isAdmin, getAllStudentsAdmin);

studentRouter.get(
  "/profile",
  isStudentLoggedIn,
  isStudent,
  getStudentProfileController
);

studentRouter.get(
  "/:studentId/admin",
  isLoggedIn,
  isAdmin,
  getSingleStudentByAdminController
);

studentRouter.put(
  "/:studentId/update",
  isStudentLoggedIn,
  isStudent,
  studentUpdateProfileController
);

studentRouter.put(
  "/:studentId/update/admin",
  isLoggedIn,
  isAdmin,
  adminUpdateStudentController
);

studentRouter.post(
  "/exam/:examId/write",
  isStudentLoggedIn,
  isStudent,
  writingExam
);

module.exports = studentRouter;
