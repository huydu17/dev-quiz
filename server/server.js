const express = require("express");
const app = express();
require("dotenv").config();
require("./config/dbConfig");
const userRoutes = require("../server/routes/User/userRoutes");
const examRoutes = require("../server/routes/Exam/examRoutes");
const questionRoutes = require("./routes/Question/questionRoutes");
const reportRoutes = require("./routes/Report/reportRoutes");
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/exams/", examRoutes);
app.use("/api/questions/", questionRoutes);
app.use("/api/reports/", reportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
