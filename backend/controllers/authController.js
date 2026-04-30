const student = require("../models/student");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");

const registerStudent = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please fill all the fields");
    }

    const studentExists = await student.findOne({ email });
    if (studentExists) {
      res.status(400);
      throw new Error("Student already exists");
    }

    const student = await student.create({ name, email, password });
    if (student) {
      res.status(201).json({
        success: true,
        data: student,
        token: generateToken(student._id),
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const loginStudent = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }

    const student = await student.findOne({ email });
    if (student && (await student.matchPassword(password))) {
      res.status(200).json({
        success: true,
        data: student,
        token: generateToken(student._id),
      });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { registerStudent, loginStudent };
