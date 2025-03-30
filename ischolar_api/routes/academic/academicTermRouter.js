const express = require("express");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const isAdmin = require("../../middlewares/isAdmin");
const {
  createAcademicTerm,
  getAllAcademicTerm,
  getSingleAcademicTerm,
  updateAcademicTerm,
  deleteAcademicTerm,
} = require("../../controllers/academics/academicTermControllers");

const academicTermRouter = express.Router();

academicTermRouter
  .route("/")
  .post(isLoggedIn, isAdmin, createAcademicTerm)
  .get(isLoggedIn, isAdmin, getAllAcademicTerm);


  academicTermRouter
  .route("/:id")
  .get(isLoggedIn, isAdmin, getSingleAcademicTerm)
  .put(isLoggedIn, isAdmin, updateAcademicTerm)
  .delete(isLoggedIn, isAdmin, deleteAcademicTerm);

module.exports = academicTermRouter; 
