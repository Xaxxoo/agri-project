const asyncHandler = require("express-async-handler");
const YearGroup = require("../../models/Academic/YearGroup");
const Admin = require("../../models/Staff/Admin");

//@Desc Create Year Group
//@Route POST api/v1/year-groups
//@Access private
exports.createYearGroup = asyncHandler(async (req, res) => {
  const { name, academicYear } = req.body;

  //Check if the academic year already exist
  const yearGroup = await YearGroup.findOne({ name });

  if (yearGroup) {
    throw new Error("year group already exist");
  }
  //Creat
  const academicYearCreated = await YearGroup.create({
    name,
    academicYear,
    createdBy: req.userAuth._id,
  });

  //find admin
  const admin = await Admin.findById(req.userAuth._id);
  if (!admin) {
    throw new Error("Admin not found");
  }
  //push year group into Admin
  admin.yearGroups.push(academicYearCreated._id);

  await admin.save();

  res.status(201).json({
    status: "success",
    message: "Year group created successfully",
    data: academicYearCreated,
  });
});

//@Desc Get All Year Groups
//@Route GET api/v1/year-groups/
//@Access private
exports.getAllYearGroups = asyncHandler(async (req, res) => {
  const yearGroups = await YearGroup.find();

  if (!yearGroups) {
    throw new Error(`No admins found`);
  } else {
    res.status(200).json({
      status: "success",
      data: yearGroups,
      message: "year Groups has been fetched successfully",
    });
  }
});

//@Desc get Singe Year Group
//@Route GET api/v1/year-groups/:id
//@Access private
exports.getSingleYearGroup = asyncHandler(async (req, res) => {
  const yearGroup = await YearGroup.findById(req.params.id);

  if (!yearGroup) {
    throw new Error(`No academic Year found`);
  } else {
    res.status(200).json({
      status: "success",
      data: yearGroup,
      message: "year Group has been fetched successfully",
    });
  }
});

//@Desc Update Year Group
//@Route PUT api/v1/year-groups/:id
//@Access private
exports.updateYearGroup = asyncHandler(async (req, res) => {
  const { name, academicYear } = req.body;

  //check if name exist
  const yearGroupFound = await YearGroup.findOne({ name });

  if (yearGroupFound) {
    throw new Error("Academic Year Already exist");
  }

  const yearGroup = await YearGroup.findByIdAndUpdate(
    req.params.id,
    { name, academicYear, createdBy: req.userAuth._id },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: "success",
    data: yearGroup,
    message: "year Group has been updated successfully",
  });
});

//@Desc Delete Year Group
//@Route DELETE api/v1/year-groups/:id
//@Access private
exports.deleteYearGroup = asyncHandler(async (req, res) => {
  await YearGroup.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Year Group has been deleted successfully",
  });
});
