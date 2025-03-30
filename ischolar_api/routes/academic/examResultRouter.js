const express = require("express");
const isStudentLoggedIn = require("../../middlewares/isStudentLoggedin");
const isStudent = require("../../middlewares/isStudent");
const isAdminLoggedIn = require("../../middlewares/isStudentLoggedin");
const isAdmin = require("../../middlewares/isStudent");
const {
  checkExamResult,
  getAllExamResult,
  adminToggleExamResult,
} = require("../../controllers/academics/examResultsController");

const examResultRouter = express.Router();

examResultRouter.get("/", isStudentLoggedIn, isStudent, getAllExamResult);
examResultRouter.get(
  "/:examId/checking",
  isStudentLoggedIn,
  isStudent,
  checkExamResult
);

examResultRouter.put("/:id/admin-toggle-publish", isAdminLoggedIn, isAdmin, adminToggleExamResult);

module.exports = examResultRouter;
