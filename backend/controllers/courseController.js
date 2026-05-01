const Course = require("../models/Course");
const Student = require("../models/student");

const createCourse = async (req, res) => {
  try {
    const { title, description, instructor } = req.body;
    if (!title || !description || !instructor) {
      res.status(400);
      throw new Error("Please fill all the fields");
    }
    const addedCourse = await Course.create({ title, description, instructor });
    if (addedCourse) {
      res.status(201).json({ success: true, data: addedCourse });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    if (courses) {
      res.status(200).json({ success: true, data: courses });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const enrollCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const studentId = req.body.studentId;

    if (!studentId) {
      res.status(400);
      throw new Error("studentId is required");
    }

    const foundCourse = await Course.findById(courseId);
    if (!foundCourse) {
      res.status(404);
      throw new Error("Course not found");
    }
    const foundStudent = await Student.findById(studentId);
    if (!foundStudent) {
      res.status(404);
      throw new Error("Student not found");
    }

    if (!Array.isArray(foundCourse.enrolledStudents)) {
      foundCourse.enrolledStudents = [];
    }

    if (
      foundCourse.enrolledStudents.some(
        (id) => id.toString() === studentId.toString(),
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Student already enrolled in this course",
      });
    }

    foundCourse.enrolledStudents.push(studentId);
    await foundCourse.save();

    foundStudent.courseEnrollment.push(courseId);
    await foundStudent.save();

    res.status(200).json({
      success: true,
      message: "Student enrolled in the course successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createCourse, getAllCourses, enrollCourse };
