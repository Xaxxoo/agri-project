const asyncHandler = require("express-async-handler");
const AcademicTerm = require("../../models/Academic/AcademicTerm");
const Admin = require("../../models/Staff/Admin");

//@Desc Create Academic Term
//@Route POST api/v1/academic-term/
//@Access private
exports.createAcademicTerm = asyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;

  //Check if the academic year already exist
  const academicTerm = await AcademicTerm.findOne({ name });

  if (academicTerm) {
    throw new Error("Academic Term already exist");
  }
  //Create
  const academicTermCreated = await AcademicTerm.create({
    name,
    description,
    duration,
    createdBy: req.userAuth._id,
  });

  //push academic year into Admin
  const admin = await Admin.findById(req.userAuth._id);
  admin.academicTerms.push(academicTermCreated._id);

  await admin.save();

  res.status(201).json({
    status: "success",
    message: "Academic Year created successfully",
    data: academicTermCreated,
  });
});

//@Desc Get All Academic Terms
//@Route GET api/v1/academic-terms/
//@Access private
exports.getAllAcademicTerms = asyncHandler(async (req, res) => {
  const academicTerm = await AcademicTerm.find();

  if (!academicTerm) {
    throw new Error(`No admins found`);
  } else {
    res.status(200).json({
      status: "success",
      data: academicTerm,
      message: "academic Term has been fetched successfully",
    });
  }
});

//@Desc get Singe Academic term
//@Route GET api/v1/academic-years/:id
//@Access private
exports.getSingleAcademicTerm = asyncHandler(async (req, res) => {
  const academicTerm = await AcademicTerm.findById(req.params.id);

  if (!academicTerm) {
    throw new Error(`No academic Year found`);
  } else {
    res.status(200).json({
      status: "success",
      data: academicTerm,
      message: "academic term has been fetched successfully",
    });
  }
});

//@Desc UpdateAcademic term
//@Route PUT api/v1/academic-term/:id
//@Access private
exports.updateAcademicYear = asyncHandler(async (req, res) => {
  const {  name, description, duration } = req.body;

  //check if name exist
  const academicTermFound = await AcademicTerm.findOne({ name });

  if (academicTermFound) {
    throw new Error("Academic Term Already exist");
  }

  const academicTerm = await AcademicTerm.findByIdAndUpdate(
    req.params.id,
    {  name, description, duration,  createdBy: req.userAuth._id },
    { new: true, runValidators: true }
  );

  if (!academicTerm) {
    throw new Error(`No admins found`);
  } else {
    res.status(200).json({
      status: "success",
      data: academicTerm,
      message: "academic term has been updated successfully",
    });
  }
});

//@Desc Delete Academic Year
//@Route DELETE api/v1/academic-years/:id
//@Access private
exports.deleteAcademicTerm = asyncHandler(async (req, res) => {
  await AcademicTerm.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "academicTerm has been deleted successfully",
  });
});
