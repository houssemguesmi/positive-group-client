const Course = require("../models/Course");
const repository = require("../repositories/base.repository");

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
    } catch (e) {
      res.status(500).error("Internal Error");
    }
  },
};
