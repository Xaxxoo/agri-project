const Teacher = require("../../models/Staff/Teacher");
const Exam = require("../../models/Academic/Exam");
const AsyncHandler = require("express-async-handler");

//@Desc Create Exams
//@Route POST api/v1/exams
//@Access private - Teachers Only
exports.createExam = AsyncHandler(async (req, res) => {
  const {
    name,
    description,
    subject,
    programm,
    academicTer,
    duration,
    examTime,
    examType,
    createdBy,
    AcademicYear,
  } = req.body;

  //Cehcke teacher
  const teacherFound = await Teacher.findById(req.userAuth?._id);

  if (!teacherFound) {
    throw new Error("Teacher Not Found");
  }

  // Check Exams
  const examsExist = await Exam.findOne({ name });

  if (examsExist) {
    throw new Error("Exams Already Exist");
  }

  //create exam
  const examCreated = await new Exam({
    name,
    description,
    subject,
    programm,
    academicTer,
    duration,
    examTime,
    examType,
    createdBy,
    AcademicYear,
  });

  //Push the exam into teacher
  teacherFound.examsCreated.push(examCreated._id);
  //save
  await examCreated.save();
  await teacherFound.save();

  res.status(201).json({
    status: success,
    message: "Exams created successfully",
    data: {
      examCreated,
    },
  });
});

//@Desc Get All Exams
//@Route GET api/v1/exams
//@Access private
exports.getAllExams = AsyncHandler(async (req, res) => {
  const exams = await Exam.find();

  if (!exams) {
    throw new Error(`No Exams found`);
  } else {
    res.status(200).json({
      status: "success",
      data: exams,
      message: "Exams has been fetched successfully",
    });
  }
});

//@Desc get Single Exam
//@Route GET api/v1/exam/:id
//@Access private
exports.getSingleExam = AsyncHandler(async (req, res) => {
  const exam = await Exam.findById(req.params.id);

  if (!exam) {
    throw new Error(`No Exam Found`);
  } else {
    res.status(200).json({
      status: "success",
      data: exam,
      message: "Exam has been fetched successfully",
    });
  }
});

//@Desc Update Exam
//@Route PUT api/v1/exams/:id
//@Access private - Teachers Only
exports.updateExam = AsyncHandler(async (req, res) => {
  const {
    name,
    description,
    subject,
    programm,
    academicTer,
    duration,
    examTime,
    examType,
    createdBy,
    AcademicYear,
  } = req.body;

  //check if exam exist
  const subjectFound = await Exam.findOne({ name });

  if (examFound) {
    throw new Error("Exam Already exist");
  }

  const examUpdated = await Exam.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      subject,
      programm,
      academicTer,
      duration,
      examTime,
      examType,
      createdBy,
      AcademicYear,
      createdBy: req.userAuth._id,
    },
    { new: true, runValidators: true }
  );

  if (!classLevel) {
    throw new Error(`No admins found`);
  } else {
    res.status(200).json({
      status: "success",
      data: examUpdated,
      message: "Exam has been updated successfully",
    });
  }
});
