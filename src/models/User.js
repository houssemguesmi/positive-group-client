const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  birthDate: Date,
  gender: String,
  job: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, unique: true },
  isActivated: { type: Boolean, default: false },
  invitees: { type: Array, default: [] },
  inviter: { type: String, default: null },
  code: { type: String, required: true },
  courses: { type: Array, default: [] }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
