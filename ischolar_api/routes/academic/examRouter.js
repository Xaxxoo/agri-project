const express = require("express");
const isTeacher = require("../../middlewares/isTeacher");
const isTeacherLoggedin = require("../../middlewares/isTeacherLoggedin");
const {
  createExam,
  getAllExams,
    getSingleExam,
    updateExam
} = require("../../controllers/academics/examsController");

const examRouter = express.Router();

examRouter
  .route("/")
  .post(isTeacherLoggedin, isTeacher, createExam)
  .get(isTeacherLoggedin, isTeacher, getAllExams)
    .get(isTeacherLoggedin, isTeacher, getSingleExam);
  
    examRouter.put('/:id', isTeacherLoggedin, isTeacher, updateExam)

module.exports = examRouter;
