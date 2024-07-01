const questionRoutes = require("express").Router();
const isLogin = require("../../middlewares/authMiddleware");
const {
  addQuestion,
  deleteQuestion,
  updateQuestion,
  getAllQuestions,
} = require("../../controllers/Question/questionController");

questionRoutes.get("/get-all", isLogin, getAllQuestions);
questionRoutes.post("/add-question", isLogin, addQuestion);
questionRoutes.post("/update-question", isLogin, updateQuestion);
questionRoutes.post("/delete-question", isLogin, deleteQuestion);

module.exports = questionRoutes;
