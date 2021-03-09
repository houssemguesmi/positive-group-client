const Chapter = require("../models/chapter");
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

  getOneChapter: async (req, res) => {
    try {
    } catch (e) {
      console.error(e);
    }
  },
};
