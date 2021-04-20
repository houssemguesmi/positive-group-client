const Course = require("../models/Course");
const User = require("../models/User");
const repository = require("../repositories/base.repository");
const CourseCode = require("../models/CourseCode")

module.exports = {

  getAllCourses: async (req, res) => {
    try {
      const courses = await repository.findAll(Course);
      res.status(200).send(courses);
    } catch (e) {
      console.error(e);
      res.status(500).send(e)
    }
  },

  getCourseById: async (req, res) => {
    try {
      const course = await repository.findOneById(req.params.courseId, Course)
      res.status(200).send(course)
    } catch (e) {
      console.error(e);
      res.status(500).send(e)
    }
  },

  unlockCourse: async (req, res) => {
    try {
      let userId = req.body.userId;
      let courseId = req.params.courseId;

      let courseCode = CourseCode.findOne({ code: req.body.code })

      // Checking if the code exists
      if (!courseCode) {
        res.status(403).send("Code does not exist")
      } else if (courseCode.course != courseId) {
        res.status(405).send("Code does not exist on this course")
      }

      // Adding the code to the codes list of the user
      User.findByIdAndUpdate(userId, { $push: { courses: courseId } })

      // Marking the code as used
      CourseCode.findOneAndUpdate({ code: req.body.code }, { usedOn: Date.now, usedBy: userId })
      res.status(200).send("Success")

    } catch (error) {
      console.error(error)
      res.status(500).send(error);
    }
  },
};
