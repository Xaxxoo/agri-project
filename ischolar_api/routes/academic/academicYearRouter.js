const express = require("express");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const isAdmin = require("../../middlewares/isAdmin");
const {
  createAcademicYear,
  getAllAcademicYears,
  getSingleAcademicYear,
  updateAcademicYear,
  deleteAcademicYear,
} = require("../../controllers/academics/academicYearControllers");

const academicYearRouter = express.Router();

academicYearRouter
  .route("/")
  .post(isLoggedIn, isAdmin, createAcademicYear)
  .get(isLoggedIn, isAdmin, getAllAcademicYears);


academicYearRouter
  .route("/:id")
  .get(isLoggedIn, isAdmin, getSingleAcademicYear)
  .put(isLoggedIn, isAdmin, updateAcademicYear)
  .delete(isLoggedIn, isAdmin, deleteAcademicYear);

module.exports = academicYearRouter;
