const Report = require("../../models/Report/Report");

const addReport = async (req, res) => {
  try {
    const report = new Report(req.body);
    await report.save();
    res.status(200).send({
      success: true,
      message: "Report added successfully",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};
const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find({}).populate("user").populate("exam");
    res.status(200).send({
      success: true,
      data: reports,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const getReportsByUser = async (req, res) => {
  try {
    console.log(req.body);
    const reports = await Report.find({ user: req.body.userId })
      .populate("user")
      .populate("exam");
    res.status(200).send({
      success: true,
      data: reports,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { getAllReports, addReport, getReportsByUser };
