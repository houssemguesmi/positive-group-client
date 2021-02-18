const router = require("express").Router();
const coursesController = require("../controllers/courses.controller");
const authenticateToken = require("../middlewares/authenticateToken");

// Retrieving existing Courses
router.get("/", coursesController.getAllCourses);

module.exports = router;
