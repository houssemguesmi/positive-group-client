const Category = require("../models/Category");
const repository = require("../repositories/base.repository");

module.exports = {

  getAllCategories: async (req, res) => {
    try {
      const categories = await repository.findAll(Category);
      res.status(200).send(categories);
    } catch (e) {
      console.error(e)
      res.status(400).send("Error")
    }
  },

  getCategoryById: async (req, res) => {
    try {
      const category = await repository.findOneById(req.params.categoryId, Category);
      res.status(200).send(category)
    } catch (e) {
      console.error(e)
      res.status(400).send("Error")
    }
  }

};
