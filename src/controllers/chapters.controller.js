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

  getChaptersByCourse: async (req, res) => {
    try {
      const course = await repository.findOneById(req.params.courseId, Course);
      const chapters = await repository.find({ course: course.name }, Chapter);
      res.status(200).send(chapters);
    } catch (e) {
      res.status(400).error("Error")
    }
  },

  getChapterById: async (req, res) => {
    try {
      const chapter = await repository.findOneById(req.params.chapterId, Chapter);
      res.status(200).send(chapter);
    } catch (e) {
      res.status(400).error("Error")
    }
  },

};
