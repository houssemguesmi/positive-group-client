require("dotenv").config();
const User = require("../models/User");
const repository = require("../repositories/base.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
            accessToken: token,
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

  signup: async (req, res) => {
    try {
      let userData = req.body;
      if (req.code) {
        // Getting the invitor via his invitation code
        const inviter = await repository.findOne({ code: code }, User);
        // Storing the inviterId in the new user
        userData.inviter = inviter._id;
      }
      // Hashing the password
      userData.password = await bcrypt.hash(userData.password, 10);
      // Storing the user
      const user = await repository.save(userData, User);
      // Sending back the response
      res.status(201).send({ message: "Created!", user: user });
    } catch (e) {
      console.error(e);
      res.status(500).send();
    }
  },

  generateCode: async (req, res) => {
    try {
      // getting the user requesting the code
      let user = await repository.findOneById(req.params.id, User)
      // Generating the random 10 characters code
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      for (var i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      // Adding the generated code to the user
      user["code"] = result;
      // Saving the new user to the Database
      const updatedUser = await repository.save(user, User);
      // Returning the response
      res.status(200).send({ code: result })
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  }

};
