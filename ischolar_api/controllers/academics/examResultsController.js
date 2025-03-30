const AsyncHandler = require("express-async-handler");
const ExamResult = require("../../models/Academic/ExamResults");
const Student = require("../../models/Academic/Student");

//@Desc Exam Result Checking
//@Route POST api/v1/exam-results/:examId/checking
//@Access private - Students only

exports.checkExamResult = AsyncHandler(async (req, res) => {
  //find the student
  const studentFound = await Student.findById(req.userAuth._id);

  if (!studentFound) {
    throw new Error("No student found");
  }

  //Find the exam result
  const examResult = await ExamResult.findOne({
    studentID: studentFound?.studentId,
    _id: req.params.id,
  })
    .populate({
      path: "exam",
      populate: {
        path: "questions",
      },
    })
    .populate("exam")
    .populate("classLevel")
    .populate("academicTerm")
    .populate("academicYear");

  //Check if exam is pulished
  if (!examResult?.isPublished) {
    throw new Error("Exam has not been published yet");
  }

  res.status(200).json({
    status: "success",
    message: "Exam Results ",
    data: {
      examResult,
      student: studentFound,
    },
  });
});

//@Desc Get All Exam Result (Name, examId)
//@Route GET api/v1/exam-results/
//@Access private - Students only
exports.getAllExamResult = AsyncHandler(async (req, res) => {
  const results = await ExamResult.find().select("exam").populate("exam");
  res.status(200).json({
    status: "success",
    message: "Exam Results Fetched Successfully",
    data: results,
  });
});

//@Desc Admin publishing Exam Result
//@Route PUT api/v1/exam-results/:id/admin-toggle-publish
//@Access private - Admin only
exports.adminToggleExamResult = AsyncHandler(async (req, res) => {
  //Find the exam result
  const examResults = await ExamResult.findById(req.params.id);

  if (!examResults) {
    throw new Error("Exam Result Not Found");
  }

  const publishResult = await ExamResult.findByIdAndUpdate(
    req.params.id,
    { isPublished: req.body.publish },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    message: "Exam Results Updated Successfully",
    data: publishResult,
  });
});
