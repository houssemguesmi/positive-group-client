const Chapter = require("../models/Chapter");
const Course = require("../models/Course");
const repository = require("../repositories/base.repository");
const catchAsync = require("../utils/catchAsync")

module.exports = {

  getAllChapters: catchAsync(async (req, res) => {
    const chapters = await repository.findAll(Chapter);
    res.status(200).send(chapters);
  }),

  getChaptersByCourse: catchAsync(async (req, res) => {
    const course = await repository.findOneById(req.params.courseId, Course);
    const chapters = await repository.find({ course: course.name }, Chapter);
    res.status(200).send(chapters);
  }),

  getChapterById: catchAsync(async (req, res) => {
    const chapter = await repository.findOneById(req.params.chapterId, Chapter);
    res.status(200).send(chapter);

  }),

};
