const course = require("../models/Course");
const student = require("../models/student");

const createCourse = async (req, res) => {
  try {
    const { title, description, instructor } = req.body;
    if (!title || !description || !instructor) {
      res.status(400);
      throw new Error("Please fill all the fields");
    }
    const course = await course.create({ title, description, instructor });
    if (course) {
      res.status(201).json({ success: true, data: course });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await course.find();
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

    const course = await course.findById(courseId);
    if (!course) {
      res.status(404);
      throw new Error("Course not found");
    }
    const student = await student.findById(studentId);
    if (!student) {
      res.status(404);
      throw new Error("Student not found");
    }

    if (course.enrollStudents.includes(studentId)) {
      res
        .status(400)
        .json({
          success: false,
          message: "Student already enrolled in this course",
        });
    }

    course.enrollStudents.push(studentId);
    await course.save();

    student.courseEnrollment.push(courseId);
    await student.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Student enrolled in the course successfully",
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createCourse, getAllCourses, enrollCourse };
