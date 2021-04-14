const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, unique: trim },
  lastName: { type: String, unique: trim },
  birthDate: Date,
  gender: { type: String, enum: ['male', 'female', null], default: null },
  job: { type: String, unique: trim },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email');
      }
    },
  },
  password: { type: String, unique: true },
  isActivated: { type: Boolean, default: false },
  invitees: { type: Array, default: [] },
  inviter: { type: String, default: null },
  code: { type: String, required: true },
  courses: { type: Array, default: [] }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
