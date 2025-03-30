const Student = require("../models/Academic/Student");

const isStudent = async (req, res, next) => {
  //find the user
  const userId = req?.userAuth?._id;

  const studentFound = await Student.findById(userId);

  //Check if student
  if (studentFound?.role === "student") {
    next();
  } else {
    next(new Error("Access Denied, Students only"));
  }
};

module.exports = isStudent;
