const express = require("express");
const {
  registerAdminController,
  loginAdminController,
  getAllAdminController,
  getAdminProfileController,
  updateAdminController,
  deleteAdminController,
  suspendTeacherController,
  unsuspendTeacherController,
  withdrawTeacherController,
  unwithdrawTeacherController,
  publishResultController,
  unpublishResultController,
} = require("../../controllers/staff/adminController");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const isAdmin = require("../../middlewares/isAdmin");
const advancedResults = require("../../middlewares/advancedResults");
const Admin = require("../../models/Staff/Admin");
const isAuth = require("../../middlewares/isAuth");
const isAuthorized = require("../../middlewares/isAuthorized");

const adminRouter = express.Router();

// register
adminRouter.post("/register", registerAdminController);

//login
adminRouter.post("/login", loginAdminController);

// get all Admin
adminRouter.get("/", isAuth(Admin), advancedResults(Admin), isAuthorized('admin'), getAllAdminController);

//get single admin
adminRouter.get("/profile", isLoggedIn, isAdmin, getAdminProfileController);

//update Admin
adminRouter.put("/", isLoggedIn, isAdmin, updateAdminController);

//delete Admin
adminRouter.delete("/:id", deleteAdminController);

//admin suspends teacher
adminRouter.put("/suspend/teacher/:id", suspendTeacherController);

// admin unsuspends teacher
adminRouter.put("/unsuspend/teacher/:id", unsuspendTeacherController);

//admin withdraws teacher
adminRouter.put("/withdraw/teacher/:id", withdrawTeacherController);

//Admin unwithdraws teacher
adminRouter.put("/unwithdraw/teacher/:id", unwithdrawTeacherController);

//Admin publishing result
adminRouter.put("/publish/exam/:id", publishResultController);

//Admin unpublishing exams
adminRouter.put("/unpublish/exam/:id", unpublishResultController);

module.exports = adminRouter;
