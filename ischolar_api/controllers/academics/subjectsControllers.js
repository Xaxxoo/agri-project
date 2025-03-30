const asyncHandler = require("express-async-handler");
const Subject = require("../../models/Academic/Subject");
const Program = require("../../models/Academic/Program");
const Admin = require("../../models/Staff/Admin");

//@Desc Create Subject
//@Route POST api/v1/Subjects/:programId
//@Access private
exports.createSubject = asyncHandler(async (req, res) => {
  const { name, description, academicTerm } = req.body;

  //find the program
  const programFound = await Program.findById(req.params.programId);

  if (!programFound) {
    throw new Error("Program Does Not Exist");
  }

  //Check if the subject already exist
  const subjectFound = await Subject.findOne({ name });

  if (subjectFound) {
    throw new Error("Subject Term already exist");
  }
  //Create
  const subjectCreated = await Subject.create({
    name,
    description,
    academicTerm,
    createdBy: req.userAuth._id,
  });

  //push subject into program
  programFound.subjects.push(subjectCreated._id);

  //save
  await programFound.save();

  res.status(201).json({
    status: "success",
    message: "Subject created successfully",
    data: subjectCreated,
  });
});

//@Desc Get All Subject
//@Route GET api/v1/subjects
//@Access private
exports.getAllSubjects = asyncHandler(async (req, res) => {
  const subjects = await Subject.find();

  if (!subjects) {
    throw new Error(`No subjects found`);
  } else {
    res.status(200).json({
      status: "success",
      data: subjects,
      message: "Subjects has been fetched successfully",
    });
  }
});

//@Desc get Single Subject
//@Route GET api/v1/subject/:id
//@Access private
exports.getSingleSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id);

  if (!subject) {
    throw new Error(`No subject  found`);
  } else {
    res.status(200).json({
      status: "success",
      data: subject,
      message: "subject has been fetched successfully",
    });
  }
});

//@Desc Update Subject
//@Route PUT api/v1/subjects/:id
//@Access private
exports.updateSubject = asyncHandler(async (req, res) => {
  const { name, description, academicTerm } = req.body;

  //check if name exist
  const subjectFound = await Subject.findOne({ name });

  if (subjectFound) {
    throw new Error("Subject Already exist");
  }

  const subject = await Subject.findByIdAndUpdate(
    req.params.id,
    { name, description, academicTerm, createdBy: req.userAuth._id },
    { new: true, runValidators: true }
  );

  if (!classLevel) {
    throw new Error(`No admins found`);
  } else {
    res.status(200).json({
      status: "success",
      data: subject,
      message: "Subject has been updated successfully",
    });
  }
});

//@Desc Delete Subject
//@Route DELETE api/v1/Subjects/:id
//@Access private
exports.deleteSubject = asyncHandler(async (req, res) => {
  await Subject.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Subject has been deleted successfully",
  });
});
