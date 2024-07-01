const {
  addExam,
  getAllExams,
  getExamById,
  editExam,
  deleteExam,
} = require("../../controllers/Exam/examController");
const isLogin = require("../../middlewares/authMiddleware");
const examRoutes = require("express").Router();

examRoutes.post("/add", isLogin, addExam);
examRoutes.get("/get-all", isLogin, getAllExams);
examRoutes.post("/get-by-id", isLogin, getExamById);
examRoutes.put("/edit/:id", isLogin, editExam);
examRoutes.delete("/delete/:id", isLogin, deleteExam);
module.exports = examRoutes;
