require("dotenv").config();
const User = require("../models/User");
const repository = require("../repositories/base.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");

module.exports = {
  login: async (req, res) => {
    try {
      const userData = await repository.findOne(
        { email: req.body.email },
        User
      );
      const user = { email: userData.email };
      if (await bcrypt.compare(req.body.password, userData.password)) {
        jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
          if (err) {
            console.log(err);
          }
          res.send({
            token,
            user: userData,
          });
        });
      } else {
        res.status(405).send({
          message: "WRONG PASSWORD",
        });
      }
    } catch (error) {
      res.status(400).json({
        error: error,
      });
    }
  },
  updateUser: async (req, res) => {
    try {
      let filter = req.body.filter;
      let payload = req.body.payload;
      let newUser = await repository.findOneAndUpdate(filter, payload, User);
      res.status(200).send(newUser);
    } catch (e) {
      res.status(500).send(e);
    }
  },
  updatePassword: async (req, res) => {
    try {
      var filter = req.body.filter;
      let payload = req.body.payload;
      let user = await repository.findOne(filter, User);
      if (!bcrypt.compareSync(payload.oldPassword, user.password)) {
        res.send({ message: "Wrong old password!" });
      } else if (payload.newPassword == payload.oldPassword) {
        res.send({ message: "Same old and new password!" });
      } else {
        payload.newPassword = bcrypt.hashSync(payload.newPassword, 10);
        let updatedUser = await repository.findOneAndUpdate(
          filter,
          { password: payload.newPassword },
          User
        );
        res.status(200).send(updatedUser);
      }
    } catch (e) {
      res.status(500).send(e);
    }
  },
  getUserByToken: async (req, res) => {
    try {
      let userEmail = jwtDecode(req.params.token).email;
      let user = await repository.findOne(
        {
          email: userEmail,
        },
        User
      );
      res.status(200).send(user);
    } catch (e) {
      res.status(500).send(e);
    }
  },
  signup: async (req, res) => {
    try {
      let userData = req.body;
      userData.password = await bcrypt.hash(userData.password, 10);
      const user = await repository.save(userData, User);
      res.status(201).send({ user });
    } catch (e) {
      console.error(e);
      res.status(500).send();
    }
  },
};
