const express = require("express");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const isAdmin = require("../../middlewares/isAdmin");
const {
    createYearGroup,
    getAllYearGroups,
    getSingleYearGroup,
    updateYearGroup,
    deleteYearGroup,
} = require("../../controllers/academics/yearGroupsControllers");

const yearGroupsRouter = express.Router();

yearGroupsRouter
  .route("/")
  .post(isLoggedIn, isAdmin, createYearGroup)
  .get(isLoggedIn, isAdmin, getAllYearGroups);


  yearGroupsRouter
  .route("/:id")
  .get(isLoggedIn, isAdmin, getSingleYearGroup)
  .put(isLoggedIn, isAdmin, updateYearGroup)
  .delete(isLoggedIn, isAdmin, deleteYearGroup);

module.exports = yearGroupsRouter;
