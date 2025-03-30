const express = require("express");
const isTeacher = require("../../middlewares/isTeacher");
const isTeacherLogeedIn = require("../../middlewares/isTeacherLoggedin");
const {
  createQuestion,
  getAllQuestions,
  getSingleQuestion,
  updateQuestion
} = require("../../controllers/academics/questionController");

const questionRouter = express.Router();

questionRouter.get("/", isTeacherLogeedIn, isTeacher, getAllQuestions);
questionRouter.post("/:examId", isTeacherLogeedIn, isTeacher, createQuestion);
questionRouter.get(
  "/:questionId",
  isTeacherLogeedIn,
  isTeacher,
  getSingleQuestion
);
questionRouter.put("/:questionId", isTeacherLogeedIn, isTeacher, updateQuestion);


module.exports = questionRouter;
