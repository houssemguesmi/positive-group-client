const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: String,
  duration: Number,
  createdOn: Date,
  chapters: { type: Array, default: [] },
  isFree: { type: Boolean, default: false }
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
