const Chapter = require("../models/Chapter");
const Course = require("../models/Course");
const repository = require("../repositories/base.repository");

module.exports = {
  getAllChapters: async (req, res) => {
    try {
      const chapters = await repository.findAll(Chapter);
      res.status(200).send(chapters);
    } catch (e) {
      console.error(e);
    }
  },
  getChapters: async (req, res) => {
    try {
      const course = await repository.findOneById(req.params.id, Course);
      var chapters = await repository.find({ course: course.name }, Chapter);
      res.status(200).send(chapters);
    } catch (e) {
      res.status(400).error("Error")
      // console.error(e);
    }
  },
  getOneChapter: async (req, res) => {
    try {
    } catch (e) {
      console.error(e);
    }
  },
};
