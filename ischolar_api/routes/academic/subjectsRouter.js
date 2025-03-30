const express = require("express");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const isAdmin = require("../../middlewares/isAdmin");
const {
  createSubject,
  getAllSubjects,
  getSingleSubject,
  updateSubject,
  deleteSubject,
} = require("../../controllers/academics/subjectsControllers");

const subjectsRouter = express.Router();

subjectsRouter.post("/:programId", isLoggedIn, isAdmin, createSubject);

subjectsRouter.get("/", isLoggedIn, isAdmin, getAllSubjects);

subjectsRouter.get("/:id", isLoggedIn, isAdmin, getSingleSubject);

subjectsRouter.put("/:id", isLoggedIn, isAdmin, updateSubject);

subjectsRouter.delete("/:id", isLoggedIn, isAdmin, deleteSubject);

module.exports = subjectsRouter;
