const asyncHandler = require("express-async-handler");
const Admin = require("../../models/Staff/Admin");
const generateToken = require("../../utils/generateToken");
const verifyToken = require("../../utils/verifyToken");
const bcrypt = require("bcryptjs");
const { hashPassword, isPasswordMatched } = require("../../utils/helpers");

//@Desc Register Admin
//@Route POST api/v1/admins/register
//@Access Private
exports.registerAdminController = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //check if email exist
  const adminFound = await Admin.findOne({ email });

  if (adminFound) {
    res.json("Admin Already Exist");
  }

  //register admin
  const user = await Admin.create({
    name,
    email,
    password: await hashPassword(password),
  });

  res.status(201).json({
    status: "success",
    data: user,
    message: "Admin Registered Successfully",
  });
});

//@Desc Login Admin
//@Route POST api/v1/admins/login
//@Access public
exports.loginAdminController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Admin.findOne({ email });
  if (!user) {
    return res.json({ message: "Invalid Login Credentials" });
  }

  //Verifying the password
  const isMatched = await isPasswordMatched(password, user.password);

  if (!isMatched) {
    return res.json({ message: "Invalid Login Credentials" });
  } else {
    return res.json({
      data: {
        token: generateToken(user._id),
        message: "Admin Logged In Successfully",
      },
    });
  }
});

//@Desc Get All Admins
//@Route POST api/v1/admins/
//@Access private
exports.getAllAdminController = asyncHandler(async (req, res) => {
  res.status(200).json(res.results);
});

//@Desc Get Admin Profile
//@Route GET api/v1/admins/
//@Access private
exports.getAdminProfileController = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.userAuth._id)
    .select("-password -createdAt -updatedAt")
    .populate("academicYears")
    .populate("academicTerms")
    .populate("programs")
    .populate("yearGroups")
    .populate("classLevels")
    .populate("students");
  if (!admin) {
    throw new Error("Admin not found");
  } else {
    res.status(200).json({
      status: "success",
      data: admin,
      message: "Admin Profile Fetched Successfully",
    });
  }
});

//@Desc Update Admin Profile
//@Route PUT api/v1/admins/:id
//@Access private
exports.updateAdminController = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const emailExist = await Admin.findOne({ email });

  if (emailExist) {
    throw new Error(`User email already exists`);
  }

  // Check if user is updating password
  if (password) {
    //Update Admin
    const admin = await Admin.findByIdAndUpdate(
      req.userAuth._id,
      {
        email,
        password: await hashPassword(password),
        name,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: admin,
      message: "Admin Profile Updated Successfully",
    });
  } else {
    //Update Admin
    const admin = await Admin.findByIdAndUpdate(
      req.userAuth._id,
      {
        email,
        name,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: admin,
      message: "Admin Profile Updated Successfully",
    });
  }
});

exports.deleteAdminController = (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      data: "Admin has been deleted successfully",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

exports.suspendTeacherController = (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      data: "Admin has suspended a teacher",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

exports.unsuspendTeacherController = (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      data: "Admin has unsuspended a teacher",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

exports.withdrawTeacherController = (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      data: "Admin has withdrawn a teacher",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

exports.unwithdrawTeacherController = (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      data: "Admin has unwithdrawn a teacher",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

exports.publishResultController = (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      data: "Admin has published an exam",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

exports.unpublishResultController = (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      data: "Admin has unpublished an exam",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};
