const express = require("express");
const morgan = require("morgan");
const adminRouter = require("../routes/staff/adminRouter");
const {
  globalErrorHandler,
  notFoundError,
} = require("../middlewares/glodalErrorHandler");
const academicYearRouter = require("../routes/academic/academicYearRouter");
const academicTermRouter = require("../routes/academic/academicYearRouter");
const classLevelRouter = require("../routes/academic/classLevelsRouter");
const subjectsRouter = require("../routes/academic/subjectsRouter");
const yearGroupsRouter = require("../routes/academic/yearGroupsRouter");
const teacherRouter = require("../routes/staff/teacherRouter");
const examRouter = require("../routes/academic/examRouter");
const studentRouter = require("../routes/academic/studentRouter");
const questionRouter = require("../routes/academic/questionRouter");
const examResultRouter = require("../routes/academic/examResultRouter")

const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/academic-years", academicYearRouter);
app.use("/api/v1/academic-terms", academicTermRouter);
app.use("/api/v1/class-levels", classLevelRouter);
app.use("/api/v1/subjects", subjectsRouter);
app.use("/api/v1/year-groups", yearGroupsRouter);
app.use("/api/v1/teachers", teacherRouter);
app.use("/api/v1/exams", examRouter);
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/questions", questionRouter);
app.use("/api/v1/exams-results", examResultRouter)


//Error Middlewares
app.use(notFoundError);
app.use(globalErrorHandler);

module.exports = app;
