const isTeacher = require("../../middlewares/isTeacher");
const isTeacherLogeedIn = require("../../middlewares/isTeacherLoggedin");
const Question = require("../../models/Academic/Questions");
const Teacher = require("../../models/Staff/Teacher");
const Exam = require("../../models/Academic/Exam");
const AsyncHandler = require("express-async-handler");

//@Desc Create Exam
//@Route POST api/v1/questions/:examId
//@Access private - Teacher only
exports.createQuestion = AsyncHandler(async (req, res) => {
  const {
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    optionE,
    isCorrectAnswer,
    createdBy,
  } = req.body;

  //find the exam
  const examFound = await Exam.findById(req.params.examId);

  if (!examFound) {
    throw new Error("No Exam Found");
  }

  //Check if Question exist
  const questExist = await Question.findOne({ question });

  if (questExist) {
    throw new Error("Question Already Exist");
  }

  //create Exam
  const questionCreated = await Question.create({
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    optionE,
    isCorrectAnswer,
    createdBy: req.userAuth._id,
  });

  //Add the question into Exam
  examFound.questions.push(questionCreated?._id);

  await examFound.save();

  res.status(201).json({
    status: "success",
    message: "Question Created",
    data: questionCreated,
  });
});

//@Desc Get All Questions
//@Route GET api/v1/questions
//@Access private
exports.getAllQuestions = AsyncHandler(async (req, res) => {
  const questions = await Question.find();

  if (!question) {
    throw new Error(`No Euestion found`);
  } else {
    res.status(200).json({
      status: "success",
      data: questions,
      message: "Question has been fetched successfully",
    });
  }
});

//@Desc get Single Question
//@Route GET api/v1/questions/:id
//@Access private
exports.getSingleQuestion = AsyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);

  if (!question) {
    throw new Error(`No Exam Found`);
  } else {
    res.status(200).json({
      status: "success",
      data: question,
      message: "Question has been fetched successfully",
    });
  }
});

//@Desc Update Exam
//@Route PUT api/v1/questions/:id
//@Access private - Teachers Only
exports.updateQuestion = AsyncHandler(async (req, res) => {
  const {
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    optionE,
    isCorrectAnswer,
    createdBy,
  } = req.body;

  //check if exam exist
  const questionFound = await Question.findOne({ question });

  if (questionFound) {
    throw new Error("question Already exist");
  }

  const questionUpdated = await Question.findByIdAndUpdate(
    req.params.id,
    {
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      optionE,
      isCorrectAnswer,
      createdBy,
      createdBy: req.userAuth._id,
    },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    data: questionUpdated,
    message: "Question has been updated successfully",
  });
});


