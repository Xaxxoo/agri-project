const asyncHandler = require("express-async-handler");
const Program = require("../../models/Academic/Program");
const Admin = require("../../models/Staff/Admin");

//@Desc Create Program
//@Route POST api/v1/programs/
//@Access private
exports.createProgram = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  //Check if the academic year already exist
  const programFound = await Program.findOne({ name });

  if (programFound) {
    throw new Error("Academic Term already exist");
  }
  //Create
  const programCreated = await Program.create({
    name,
    description,
    createdBy: req.userAuth._id,
  });

  //push program  into Admin
  const admin = await Admin.findById(req.userAuth._id);
  admin.classLevels.push(programCreated._id);

  await admin.save();

  res.status(201).json({
    status: "success",
    message: "program Created created successfully",
    data: programCreated,
  });
});

//@Desc Get All Programs
//@Route GET api/v1/programs
//@Access private
exports.getAllPrograms = asyncHandler(async (req, res) => {
  const programs = await Program.find();

  if (!programs) {
    throw new Error(`No admins found`);
  } else {
    res.status(200).json({
      status: "success",
      data: programs,
      message: "classLevel has been fetched successfully",
    });
  }
});

//@Desc get Single program
//@Route GET api/v1/program/:id
//@Access private
exports.getSingleProgram = asyncHandler(async (req, res) => {
  const program = await Program.findById(req.params.id);

  if (!program) {
    throw new Error(`No class Level  found`);
  } else {
    res.status(200).json({
      status: "success",
      data: program,
      message: "program has been fetched successfully",
    });
  }
});

//@Desc UpdateAcademic program
//@Route PUT api/v1/programs/:id
//@Access private
exports.updateProgram = asyncHandler(async (req, res) => {
  const {  name, description } = req.body;

  //check if name exist
  const programFound = await Program.findOne({ name });

  if (programFound) {
    throw new Error("program Already exist");
  }

  const program = await Program.findByIdAndUpdate(
    req.params.id,
    {  name, description,  createdBy: req.userAuth._id },
    { new: true, runValidators: true }
  );

  if (!program) {
    throw new Error(`No admins found`);
  } else {
    res.status(200).json({
      status: "success",
      data: program,
      message: "program has been updated successfully",
    });
  }
});

//@Desc Delete Program
//@Route DELETE api/v1/program/:id
//@Access private
exports.deleteProgram = asyncHandler(async (req, res) => {
  await Program.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Program has been deleted successfully",
  });
});
