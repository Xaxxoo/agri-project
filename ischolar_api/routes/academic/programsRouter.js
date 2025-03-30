const express = require("express");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const isAdmin = require("../../middlewares/isAdmin");
const {
  
  createProgram,
  getAllPrograms,
  getSingleProgram,
  updateProgram,
  deleteProgram
} = require("../../controllers/academics/programsControllers");

const programsRouter = express.Router();

programsRouter
  .route("/")
  .post(isLoggedIn, isAdmin, createProgram)
  .get(isLoggedIn, isAdmin, getAllPrograms);


  programsRouter
  .route("/:id")
  .get(isLoggedIn, isAdmin, getSingleProgram)
  .put(isLoggedIn, isAdmin, updateProgram)
  .delete(isLoggedIn, isAdmin, deleteProgram);

module.exports = programsRouter;
