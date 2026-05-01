const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
    password: {
      type: String,
      required: [true, "Please enter the password of the student"],
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

studentSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

studentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Student", studentSchema);
