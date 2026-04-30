const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the name of the student"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter the email of the student"],
      unique: true,
      trim: true,
    },
    courseEnrollment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  {
    timestamps: true,
  },
);

studentSchema.pre("save", ()=>{
  
})

module.exports = mongoose.model("Student", studentSchema);
