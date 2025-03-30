const asyncHandler = require("express-async-handler");
const ClassLevel = require("../../models/Academic/ClassLevel");
const Admin = require("../../models/Staff/Admin");

//@Desc Create ClassLevel
//@Route POST api/v1/class-level/
//@Access private
exports.createClassLevel = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  //Check if the academic year already exist
  const classLevel = await ClassLevel.findOne({ name });

  if (classLevel) {
    throw new Error("Academic Term already exist");
  }
  //Create
  const classLevelCreated = await ClassLevel.create({
    name,
    description,
    createdBy: req.userAuth._id,
  });

  //push Class level  into Admin
  const admin = await Admin.findById(req.userAuth._id);
  admin.classLevels.push(classLevelCreated._id);

  await admin.save();

  res.status(201).json({
    status: "success",
    message: "Class level created successfully",
    data: classLevelCreated,
  });
});

//@Desc Get All Class levels
//@Route GET api/v1/class-level
//@Access private
exports.getAllClassLevels = asyncHandler(async (req, res) => {
  const classLevel = await ClassLevel.find();

  if (!classLevel) {
    throw new Error(`No admins found`);
  } else {
    res.status(200).json({
      status: "success",
      data: classLevel,
      message: "classLevel has been fetched successfully",
    });
  }
});

//@Desc get Single Class levels
//@Route GET api/v1/class-level/:id
//@Access private
exports.getSingleClassLevel = asyncHandler(async (req, res) => {
  const classLevel = await ClassLevel.findById(req.params.id);

  if (!classLevel) {
    throw new Error(`No class Level  found`);
  } else {
    res.status(200).json({
      status: "success",
      data: classLevel,
      message: "classLevel has been fetched successfully",
    });
  }
});

//@Desc UpdateAcademic class Level
//@Route PUT api/v1/class-level/:id
//@Access private
exports.updateClassLevel = asyncHandler(async (req, res) => {
  const {  name, description } = req.body;

  //check if name exist
  const classLevelFound = await ClassLevel.findOne({ name });

  if (classLevelound) {
    throw new Error("class Level Already exist");
  }

  const classLevel = await ClassLevel.findByIdAndUpdate(
    req.params.id,
    {  name, description,  createdBy: req.userAuth._id },
    { new: true, runValidators: true }
  );

  if (!classLevel) {
    throw new Error(`No admins found`);
  } else {
    res.status(200).json({
      status: "success",
      data: classLevel,
      message: "classLevel has been updated successfully",
    });
  }
});

//@Desc Delete Class levels
//@Route DELETE api/v1/class-level/:id
//@Access private
exports.deleteClassLevel = asyncHandler(async (req, res) => {
  await ClassLevel.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "class Level has been deleted successfully",
  });
});
