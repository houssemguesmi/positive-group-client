const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: String, required: true },
  description: String,
  courses: { type: Array, default: [] },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
