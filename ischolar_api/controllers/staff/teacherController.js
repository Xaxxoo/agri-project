const AsyncHandler = require("express-async-handler");
const Teacher = require("../../models/Staff/Teacher");
const Admin = require("../../models/Staff/Admin");

const { hashPassword, isPassMatched } = require("../../utils/helpers");
const generateToken = require("../../utils/generateToken");

//@Desc Admin Register Teacher
//@Route POST api/v1/teachers/admins/register
//@Access private - admin only
exports.adminRegisterTeacher = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //Find the admin
  const admin = await Admin.findById(req.userAuth._id);

  if (!admin) {
    throw new Error("Admin Not Found");
  }

  //check if teacher already exist
  const teacher = await Teacher.findOne({ email });
  if (teacher) {
    throw new Error("Teacher Already Employed");
  }

  //Hash password
  const hashedPassword = await hashPassword(password);

  //Create
  const teacherCreated = await Teacher.create({
    name,
    email,
    password: hashedPassword,
  });

  //push Teacher Into Admin
  admin.teachers.push(teacherCreated?._id);

  await admin.save();

  //send data
  res.status(201).json({
    status: "success",
    data: teacherCreated,
    message: "Teacher Created successfully",
  });
});

//@Desc log in a teacher
//@Route POST api/v1/teachers/login
//@Access Public
exports.loginTeacher = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Teacher.findOne({ email });
  if (!user) {
    return res.json({ message: "Invalid Login Credentials" });
  }

  //Verifying the password
  const isMatched = await isPassMatched(password, user.password);

  if (!isMatched) {
    return res.json({ message: "Invalid Login Credentials" });
  } else {
    return res.status(200).json({
      data: {
        token: generateToken(user?._id),
        message: "Teacher Logged In Successfully",
      },
    });
  }
});

//@Desc get all teachers
//@Route GET api/v1/teachers
//@Access Private - Admin Only
exports.getAllTeachersAdmin = AsyncHandler(async (req, res) => {

  res.status(200).json(res.result);
});

//@Desc Get Single Teacher
//@Route GET api/v1/teachers/:teacherId/admin
//@Access private - Admin Only
exports.getSingleTeacherByAdminController = AsyncHandler(async (req, res) => {
  const teacherId = req.params.teacherId;
  const teacher = await Teacher.findById(teacherId).select(
    "-password -createdAt -updatedAt"
  );

  if (!teacher) {
    throw new Error("Teacher not found");
  } else {
    res.status(200).json({
      status: "success",
      data: teacher,
      message: "Admin Fetched Teacher Successfully",
    });
  }
});

//@Desc Get Teacher Profile
//@Route GET api/v1/teachers/profile
//@Access private - teacher only
exports.getTeacherProfileController = AsyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.userAuth._id).select(
    "-password -createdAt -updatedAt"
  );
  if (!admin) {
    throw new Error("Admin not found");
  } else {
    res.status(200).json({
      status: "success",
      data: teacher,
      message: "Teacher Profile Fetched Successfully",
    });
  }
});

//@Desc Teacher Update Teacher Profile
//@Route PUT api/v1/teachers/:teacherId/update
//@Access private - Teacher only
exports.teacherUpdateProfileController = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const emailExist = await Teacher.findOne({ email });

  if (emailExist) {
    throw new Error(`User email already exists`);
  }

  // Check if user is updating password
  if (password) {
    //Update Teacher
    const teacher = await Teacher.findByIdAndUpdate(
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
      data: teacher,
      message: "Admin Profile Updated Successfully",
    });
  } else {
    //Update Teacher
    const teacher = await Teacher.findByIdAndUpdate(
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
      data: teacher,
      message: "Admin Profile Updated Successfully",
    });
  }
});

//@Desc Admin Update Teacher Profile
//@Route PUT api/v1/teachers/:teacherId/update/admin
//@Access private - Admin only
exports.adminUpdateTeacherController = AsyncHandler(async (req, res) => {
  const { program, classLevel, subjects, academicYear } = req.body;

  const teacherFound = await Teacher.findById(req.params.teacherId);

  if (!teacherFound) {
    throw new Error(`Teacher not found`);
  }

  //Check if teacher is  withdrawnn
  if (teacherFound.isWitdrawn) {
    throw new Error("Action Denied, Teacher is Withdrawn");
  }

  //Assign a program
  if (program) {
    teacherFound.program = program;
    await teacherFound.save();

    res.status(200).json({
      status: "success",
      data: teacherFound,
      message: "Admin Profile Updated Successfully",
    });
  }

  //Assign Class Level
  if (classLevel) {
    teacherFound.classLevel = classLevel;
    await teacherFound.save();

    res.status(200).json({
      status: "success",
      data: teacherFound,
      message: "Admin Profile Updated Successfully",
    });
  }

  //Assign Academic year
  if (academicYear) {
    teacherFound.academicYear = academicYear;
    await teacherFound.save();

    res.status(200).json({
      status: "success",
      data: teacherFound,
      message: "Admin Profile Updated Successfully",
    });
  }

  //Assign subject
  if (subject) {
    teacherFound.subject = subject;
    await teacherFound.save();

    res.status(200).json({
      status: "success",
      data: teacherFound,
      message: "Admin Profile Updated Successfully",
    });
  }
});
