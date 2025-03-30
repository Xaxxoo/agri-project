const asyncHandler = require("express-async-handler");
const AcademicYear = require("../../models/Academic/AcademicYear");
const Admin = require("../../models/Staff/Admin");

//@Desc Create Academic Year
//@Route POST api/v1/academic-years/
//@Access private
exports.createAcademicYear = asyncHandler(async (req, res) => {
  const { name, fromYear, toYear } = req.body;

  //Check if the academic year already exist
  const academicYear = await AcademicYear.findOne({ name });

  if (academicYear) {
    throw new Error("Academic year already exist");
  }
  //Creat
  const academicYearCreated = await AcademicYear.create({
    name,
    fromYear,
    toYear,
    createdBy: req.userAuth._id,
  });

  //push academic year into Admin
  const admin = await Admin.findById(req.userAuth._id);
  admin.academicYears.push(academicYearCreated._id);

  await admin.save();

  res.status(201).json({
    status: "success",
    message: "Academic Year created successfully",
    data: academicYearCreated,
  });
});

//@Desc Get All Academic Years
//@Route GET api/v1/academic-years/
//@Access private
exports.getAllAcademicYears = asyncHandler(async (req, res) => {
  const academicYears = await AcademicYear.find();

  if (!academicYears) {
    throw new Error(`No admins found`);
  } else {
    res.status(200).json({
      status: "success",
      data: academicYears,
      message: "academicYears has been fetched successfully",
    });
  }
});

//@Desc get Singe Academic Year
//@Route GET api/v1/academic-years/:id
//@Access private
exports.getSingleAcademicYear = asyncHandler(async (req, res) => {
  const academicYear = await AcademicYear.findById(req.params.id);

  if (!academicYear) {
    throw new Error(`No academic Year found`);
  } else {
    res.status(200).json({
      status: "success",
      data: academicYear,
      message: "academicYear has been fetched successfully",
    });
  }
});

//@Desc UpdateAcademic Year
//@Route PUT api/v1/academic-years/:id
//@Access private
exports.updateAcademicYear = asyncHandler(async (req, res) => {
  const { name, fromYear, toYear } = req.body;

  //check if name exist
  const academicYearFound = await AcademicYear.findOne({ name });

  if (academicYearFound) {
    throw new Error("Academic Year Already exist");
  }

  const academicYear = await AcademicYear.findByIdAndUpdate(
    req.params.id,
    { name, fromYear, toYear, createdBy: req.userAuth._id },
    { new: true, runValidators: true }
  );

  if (!academicYear) {
    throw new Error(`No admins found`);
  } else {
    res.status(200).json({
      status: "success",
      data: academicYear,
      message: "academicYear has been updated successfully",
    });
  }
});

//@Desc Delete Academic Year
//@Route DELETE api/v1/academic-years/:id
//@Access private
exports.deleteAcademicYear = asyncHandler(async (req, res) => {
  await AcademicYear.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "academicYear has been deleted successfully",
  });
});
