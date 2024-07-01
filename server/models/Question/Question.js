const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    correctOptions: {
      type: String,
      required: [true, "Correct options is required"],
    },
    options: {
      type: Object,
      required: [true, "Options is required"],
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: [true, "Exam is required"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Question", questionSchema);
