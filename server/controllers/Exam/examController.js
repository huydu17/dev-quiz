const Exam = require("../../models/Exam/Exam");

//Add exam

const addExam = async (req, res) => {
  try {
    const examExists = await Exam.findOne({ name: req.body.name });
    if (examExists) {
      return res.status(409).json({
        success: false,
        message: "Exam already exists",
      });
    }
    const exam = new Exam(req.body);
    await exam.save();
    return res.status(200).json({
      message: "Exam created successfully",
      success: true,
      data: exam,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

//getAll
const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find({});
    return res.status(200).json({
      message: "Get all exam successfully",
      success: true,
      data: exams,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

//getbyId
const getExamById = async (req, res) => {
  try {
    const exam = await Exam.findById(req.body.examId).populate("questions");
    res.send({
      message: "Exam fetched successfully",
      data: exam,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
};

//Edit Exam
const editExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).json({
      message: "Exam updated successfully",
      success: true,
      data: exam,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

//Delete Exam
const deleteExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "Exam deleted successfully",
      success: true,
      data: exam,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
module.exports = {
  addExam,
  getAllExams,
  getExamById,
  editExam,
  deleteExam,
};
