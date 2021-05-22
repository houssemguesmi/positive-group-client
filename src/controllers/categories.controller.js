const Category = require("../models/Category");
const repository = require("../repositories/base.repository");
const catchAsync = require("../utils/catchAsync")

module.exports = {

  getAllCategories: catchAsync(async (req, res) => {
    const categories = await repository.findAll(Category);
    res.status(200).send(categories);
  }),

  getCategoryById: catchAsync(async (req, res) => {
    const category = await repository.findOneById(req.params.categoryId, Category);
    res.status(200).send(category)
  })

};
