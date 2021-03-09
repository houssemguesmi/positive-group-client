const Course = require("../models/Course");
const repository = require("../repositories/base.repository");

module.exports = {
  getAllCourses: async (req, res) => {
    try {
      const courses = await repository.findAll(Course);
      res.status(200).send(courses);
    } catch (e) {
      console.error(e);
    }
  },

  unlockCourse: async (req, res) => {
    try {
    } catch (e) {
      console.error(e);
    }
  },
};
