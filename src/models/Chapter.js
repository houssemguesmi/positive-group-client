const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chapterSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  video: { type: String, required: true },
  course: { type: String, required: true },
});

const Chapter = mongoose.model("Chapter", chapterSchema);

module.exports = Chapter;
