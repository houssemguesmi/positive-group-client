require("dotenv").config();
const User = require("../models/User");
const ActivationCode = require("../models/ActivationCode");

const repository = require("../repositories/base.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");

const catchAsync = require("../utils/catchAsync");
const Course = require("../models/Course");

module.exports = {

  updateUser: catchAsync(async (req, res) => {
    let newUser = await repository.findOneAndUpdate({ _id: req.params.userId }, req.body.payload, User);
    res.status(200).send(newUser);
  }),

  getUserByToken: catchAsync(async (req, res) => {
    let userEmail = jwtDecode(req.params.token).email;
    let user = await repository.findOne({ email: userEmail }, User);
    res.status(200).send(user);
  }),

  activateAccount: catchAsync(async (req, res) => {
    let userId = req.params.userId;
    let codeUsedBy = await ActivationCode.findOne({ code: req.body.code }, 'usedBy');
    if (!codeUsedBy) {
      await ActivationCode.findOneAndUpdate({ code: req.body.code }, { usedBy: userId });
    } else {
      res.status(405).send("Code is already used!")
    }
    let user = await User.findByIdAndUpdate({ _id: userId }, { isActivated: true })
    res.status(200).send(user)
  }),

  updateUser: catchAsync(async (req, res) => {
    const newUserData = req.body;
    // If the user uploaded a new image, call cloudinary API to save the new image
    newUserData.image = req.file ?
      await filesRepository.saveFileToCloudinary("category", req.file.path, req.body.name)
      // Otherwise, we keep the same old image 
      : newUserData.image;
    const updatedUser = await repository.updateOne(User, req.params.userId, newUserData)
    res.status(200).send(updatedUser)
  })

};
