const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter the title of the course"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please enter the description of the course"],
      trim: true,
    },
    instructor: {
      type: String,
      required: [true, "Please enter the name of the instructor"],
      trim: true,
    },
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Course", courseSchema);
