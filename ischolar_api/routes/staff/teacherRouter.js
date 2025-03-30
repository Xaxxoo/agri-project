const express = require("express");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const isAdmin = require("../../middlewares/isAdmin");
const isTeacherLoggedIn = require("../../middlewares/isTeacherLoggedin");
const isTeacher = require("../../middlewares/isTeacher");
const {
  adminRegisterTeacher,
  loginTeacher,
  getAllTeachersAdmin,
  getSingleTeacherByAdminController,
  getTeacherProfileController,
  teacherUpdateProfileController,
  adminUpdateTeacherController,
} = require("../../controllers/staff/teacherController");
const advancedResults = require("../../middlewares/advancedResults");
const Teacher = require("../../models/Staff/Teacher");

const teacherRouter = express.Router();

teacherRouter.post(
  "/admin/register",
  isLoggedIn,
  isAdmin,
  adminRegisterTeacher
);

teacherRouter.post("/login", loginTeacher);

teacherRouter.get(
  "/admin",
  isLoggedIn,
  isAdmin,
  advancedResults(Teacher, {
    path: "examCreated",
    poupulate: { path: "questions" },
  }),
  getAllTeachersAdmin
);

teacherRouter.get(
  "/profile",
  isTeacherLoggedIn,
  isTeacher,
  getTeacherProfileController
);

teacherRouter.get(
  "/:teacherId/admin",
  isLoggedIn,
  isAdmin,
  getSingleTeacherByAdminController
);

teacherRouter.put(
  "/:teacherId/update",
  isTeacherLoggedIn,
  isTeacher,
  teacherUpdateProfileController
);

teacherRouter.put(
  "/:teacherId/update/admin",
  isLoggedIn,
  isAdmin,
  adminUpdateTeacherController
);

module.exports = teacherRouter;
