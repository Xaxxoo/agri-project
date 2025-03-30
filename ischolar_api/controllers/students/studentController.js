const Student = require("../../models/Academic/Student");
const Exam = require("../../models/Academic/Exam");
const ExamResults = require("../../models/Academic/ExamResults");
const Question = require("../../models/Academic/Questions");
const AsyncHandler = require("express-async-handler");
const { hashPassword, isPassMatched } = require("../../utils/helpers");
const generateToken = require("../../utils/generateToken");
const ExamResult = require("../../models/Academic/ExamResults");

//@Desc Admin Register Student
//@Route POST api/v1/student/admins/register
//@Access private - Admin only
exports.adminRegisterStudent = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //Find the admin
  const admin = await Admin.findById(req.userAuth._id);

  if (!admin) {
    throw new Error("Admin Not Found");
  }

  //check if student already exist
  const studentFound = await Student.findOne({ email });
  if (studentFound) {
    throw new Error("Student Already Registered");
  }

  //Hash password
  const hashedPassword = await hashPassword(password);

  //Create
  const studentCreated = await Student.create({
    name,
    email,
    password: hashedPassword,
  });

   //push STudent Into Admin
   admin.students.push(studentCreated?._id);

   await admin.save();

  //send data
  res.status(201).json({
    status: "success",
    data: studentCreated,
    message: "Student Created successfully",
  });
});

//@Desc log in a student
//@Route POST api/v1/students/login
//@Access Public
exports.loginStudent = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Student.findOne({ email });
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
        message: "Student Logged In Successfully",
      },
    });
  }
});

//@Desc Get Student Profile
//@Route GET api/v1/students/profile
//@Access private - student only
exports.getStudentProfileController = AsyncHandler(async (req, res) => {
  const student = await Student.findById(req.userAuth._id)
    .select("-password -createdAt -updatedAt")
    .populate("examResults");
  if (!student) {
    throw new Error("Student not found");
  }
  // Get student Profile
  const studentProfile = {
    name: student?.name,
    email: student?.email,
    currentClassLevel: student?.currentClassLevel,
    program: student?.program,
    dateAdmitted: student?.dateAdmitted,
    isSuspended: student?.isSuspended,
    isWithdrawn: student?.isWithdrawn,
    studentId: student?.studentId,
  };

  //Get Student Exam result
  const examResult = student?.examResults;

  //current Exam
  const currentExamResult = examResults[examResults.length - 1];

  //Check if exam is published
  const isPublished = currentExamResult?.isPublished;

  res.status(200).json({
    status: "success",
    data: {
      studentProfile,
      currentExamResult: isPublished ? currentExamResult : [],
    },
    message: "Student Profile Fetched Successfully",
  });
});

//@Desc get all students
//@Route GET api/v1/students
//@Access Private - Admin Only
exports.getAllStudentsAdmin = AsyncHandler(async (req, res) => {
  const student = await Student.find();

  res.status(200).json({
    status: "success",
    message: "Student Fetched Successfully",
    data: student,
  });
});

//@Desc Get Single Student
//@Route GET api/v1/students/:studentId/admin
//@Access private - Admin Only
exports.getSingleStudentByAdminController = AsyncHandler(async (req, res) => {
  const studentId = req.params.studentId;
  const student = await Student.findById(studentId).select(
    "-password -createdAt -updatedAt"
  );

  if (!student) {
    throw new Error("student not found");
  } else {
    res.status(200).json({
      status: "success",
      data: student,
      message: "Admin Fetched Student Successfully",
    });
  }
});

//@Desc Student Update Student Profile
//@Route PUT api/v1/students/:sutudentId/update
//@Access private - Student only
exports.studentUpdateProfileController = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const emailExist = await Student.findOne({ email });

  if (emailExist) {
    throw new Error(`User email already exists`);
  }

  // Check if user is updating password
  if (password) {
    //Update Student
    const student = await Student.findByIdAndUpdate(
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
      data: student,
      message: "Admin Profile Updated Successfully",
    });
  } else {
    //Update Teacher
    const student = await Teacher.findByIdAndUpdate(
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
      data: student,
      message: "Student Profile Updated Successfully",
    });
  }
});

//@Desc Admin Update student Profile
//@Route PUT api/v1/students/:studentId/update/admin
//@Access private - Admin only
exports.adminUpdateStudentController = AsyncHandler(async (req, res) => {
  const {
    program,
    classLevel,
    academicYear,
    name,
    email,
    prefectName,
    isSuspended,
    isWithdrawn,
  } = req.body;

  //find student by ID
  const studentFound = await Student.findById(req.params.studentId);

  if (!studentFound) {
    throw new Error(`student not found`);
  }

  //Assign a program
  if (program) {
    studentFound.program = program;
    await studentFound.save();

    res.status(200).json({
      status: "success",
      data: studentFound,
      message: "student Profile Updated Successfully",
    });
  }

  //Update
  const studentUpdated = await Student.findByIdAndUpdate(
    req.params.studentid,
    {
      $set: {
        program,
        academicYear,
        name,
        email,
        prefectName,
        isSuspended,
        isWithdrawn,
      },
      $addToSet: {
        classLevel,
      },
    },
    {
      new: true,
    }
  );

  //send response
  res.status(200).json({
    success: true,
    data: studentUpdated,
    message: studentUpdated,
  });
});

//@Desc Student taking Exam
//@Route PUT api/v1/students/exam/:examId/write
//@Access private - Student Only
exports.writingExam = AsyncHandler(async (req, res) => {
  //Get Student
  const studentFound = await Student.findById(req.userAuth._id);
  if (!studentFound) {
    throw new Error("Student not Found");
  }

  //Get Exam
  const examFound = await Exam.findById(req.params.examId)
    .populate("questions")
    .populate("academicTerm");
  if (!examFound) {
    throw new Error("Exam not Found");
  }

  //Get the questions
  const questions = examFound?.questions;

  //Get Student Answers
  const studentAnswers = req.body.answers;

  //Check if student answered all questions
  if (studentAnswers.length !== questions.length) {
    throw new Error("You have not answered all questions");
  }

  //Check if student has already written the examination
  const studenFoundResult = await ExamResults.findOne({
    student: studentFound._id,
  });

  if (studenFoundResult) {
    throw new Error("You have already written this exam");
  }

  //Check if student has been suspended or withdrawn
  if (studentFound.isWithdrawn || studentFound.isSuspended) {
    throw new Error(
      "You have been suspended/withdrawn hence you can not take exams"
    );
  }

  //Build report object
  let correctAnswers = 0;
  let wrongAnswers = 0;
  let status = ""; //failed or pass
  let score = 0;
  let remarks = "";
  let grade = 0;
  let answeredQuestions = [];

  //Check for answers
  for (let i = 0; i < questions.length; i++) {
    //Find the question
    const question = questions[i];

    //Check the answer is correct
    if (question.correctAnswers === studentAnswers[i]) {
      correctAnswers++;
      score++;
      question.isCoreect = true;
    } else {
      wrongAnswers++;
    }
  }

  //Calculate Reports
  totalQuestions = questions.length;
  grade = (correctAnswers / questions.length) * 100;

  answeredQuestions = questions.map((questions) => {
    return {
      question: question.question,
      correctAnswer: question.correctAnswer,
      isCorrect: question.isCorrect,
    };
  });

  //Calculate the status
  if (grade >= 50) {
    status = "passed";
  } else {
    status = failed;
  }

  //Remarks
  if (grade >= 80) {
    remarks = "Excellent";
  } else if (grade >= 70) {
    remarks = "Very Good";
  } else if (grade >= 60) {
    remarks = "Good";
  } else if (grade >= 50) {
    remarks = "Fair";
  } else {
    remarks = "Poor";
  }

  //Generate Exam Result
  const examResults = await ExamResults.create({
    studentID: studentFound?.studentId,
    exam: examFound?._id,
    grade,
    score,
    status,
    remarks,
    classLevel: examFound.classLevel,
    academicTerm: examFound.academicTerm,
    academicYear: examFound.academicYear,
    answeredQuestions: answeredQuestions,
  });

  //Push The Result into student
  studentFound.examResults.push(examResults?._id);

  await studentFound.save();

  //Promoting Students to Level 200
  if (
    examFound.academicTerm.name === "3rd Term" &&
    status === "pass" &&
    studentFound?.currentClassLevel === "Level 100"
  ) {
    //Promote Student to Level 200
    studentFound?.classLevels.push("Level 200");
    studentFound.currentClassLevel = "Level 200";

    await studentFound.save();
  }

  //Promoting Students to Level 300
  if (
    examFound.academicTerm.name === "3rd Term" &&
    status === "pass" &&
    studentFound?.currentClassLevel === "Level 200"
  ) {
    //Promote Student to Level 200
    studentFound?.classLevels.push("Level 300");
    studentFound.currentClassLevel = "Level 300";

    await studentFound.save();
  }

  //Promoting Students to Level 400
  if (
    examFound.academicTerm.name === "3rd Term" &&
    status === "pass" &&
    studentFound?.currentClassLevel === "Level 300"
  ) {
    //Promote Student to Level 200
    studentFound?.classLevels.push("Level 400");
    studentFound.currentClassLevel = "Level 400";

    await studentFound.save();
  }

  //Promoting Students to graduate
  if (
    examFound.academicTerm.name === "3rd Term" &&
    status === "pass" &&
    studentFound?.currentClassLevel === "Level 400"
  ) {
    studentFound.isGraduated = true;
    studentFound.yearGraduated = new Date();

    await studentFound.save();
  }

  res.status(200).json({
    status: "success",
    message: "Exam taken successfully",
    data: "You have Submitted Your Exam, Check Later For Result",
  });
});
