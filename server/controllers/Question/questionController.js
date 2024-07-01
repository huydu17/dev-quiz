const Exam = require("../../models/Exam/Exam");
const Question = require("../../models/Question/Question");

//add
const addQuestion = async (req, res) => {
  try {
    const question = new Question(req.body);
    const exam = await Exam.findById(req.body.exam);
    exam.questions.push(question._id);
    await exam.save();
    await question.save();
    res.status(200).send({
      message: "Question added successfully",
      success: true,
      data: question,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
      data: err,
      success: false,
    });
  }
};
const getAllQuestions = async (req, res) => {
  try {
    const exam = await Exam.findById(req.body.exam).populate("questions");
    exam.questions.res.status(200).send({
      message: "Get all questions successfully",
      success: true,
      data: questions,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
      data: err,
      success: false,
    });
  }
};

const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.body.question_id,
      req.body
    );
    res.status(200).send({
      message: "Question updated successfully",
      success: true,
      data: question,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
      data: err,
      success: false,
    });
  }
};
const deleteQuestion = async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.body.question_id);
    const exam = await Exam.findById(req.body.exam);

    console.log(req.body.question_id);
    exam.questions = exam.questions.filter(
      (question) => question.toString() !== req.body.question_id.toString()
    );
    await exam.save();
    res.status(200).send({
      message: "Question deleted successfully",
      success: true,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
      data: err,
      success: false,
    });
  }
};

module.exports = {
  addQuestion,
  deleteQuestion,
  updateQuestion,
  getAllQuestions,
};
