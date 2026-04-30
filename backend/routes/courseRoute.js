const express = require("express");
const { route } = require("./authRoutes");
const {
  createCourse,
  getAllCourses,
  enrollCourse,
} = require("../controllers/courseController");
const router = express.Router();

router.post("/courses", createCourse);
router.get("/courses", getAllCourses);
router.post("/courses/:id/enroll", enrollCourse);

module.exports = router;
