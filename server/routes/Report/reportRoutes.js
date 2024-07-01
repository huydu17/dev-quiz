const {
  getAllReports,
  addReport,
  getReportsByUser,
} = require("../../controllers/Report/reportController");
const isLogin = require("../../middlewares/authMiddleware");

const reportRoutes = require("express").Router();
reportRoutes.get("/get-all", isLogin, getAllReports);
reportRoutes.post("/add-report", isLogin, addReport);
reportRoutes.get("/get-report-by-user", isLogin, getReportsByUser);

module.exports = reportRoutes;
