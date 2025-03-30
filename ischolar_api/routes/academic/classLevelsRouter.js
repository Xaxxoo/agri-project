const express = require("express");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const isAdmin = require("../../middlewares/isAdmin");
const {
  createClassLevel,
  getAllClassLevels,
  getSingleClassLevel,
  updateClassLevel,
  deleteClassLevel,
} = require("../../controllers/academics/classLevelControllers");

const classLevelRouter = express.Router();

classLevelRouter
  .route("/")
  .post(isLoggedIn, isAdmin, createClassLevel)
  .get(isLoggedIn, isAdmin, getAllClassLevels);


  classLevelRouter
  .route("/:id")
  .get(isLoggedIn, isAdmin, getSingleClassLevel)
  .put(isLoggedIn, isAdmin, updateClassLevel)
  .delete(isLoggedIn, isAdmin, deleteClassLevel);

module.exports = classLevelRouter;
