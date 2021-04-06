require("dotenv").config();
const User = require("../models/User");
const BonusTree = require("../models/BonusTree")
const repository = require("../repositories/base.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");

module.exports = {

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
      await repository.save(user, User);
      // Returning the response
      res.status(200).send({ code: result })
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  },

  calculateBonus: async (req, res) => {
    try {
      // Get user id from params
      let userId = req.params.id;

    } catch (err) {
      console.error(err)
    }
  },

  getBonusTree: async (req, res) => {
    try {
      // Get user id from params
      let userId = req.params.id;
      // const bonusTree = await BonusTree.findOne({ user_id: userId })
      const bonusTree = await BonusTree.find({})
      console.log(bonusTree)
      res.send(bonusTree)

    } catch (err) {
      console.error(err)
    }
  },

  // getBonusByLevel: async (req, res) => {
  //   try {
  //     // Get user id from params
  //     let userId = req.params.id;
  //     // Get level id from params
  //     let bonusLevel = req.params.id;
  //   } catch (err) {

  //   }
  // },

  // getInviteesNumber: async (req, res) => {
  //   try {
  //     let invitees = 0;
  //     // Get user id from params
  //     const userId = req.params.id;
  //     // Get level1 invitees from bonus tree
  //     const level1Invitees = await BonusTree.find({ user_id: userId }, 'invitees');
  //     const level1Number = level1Invitees.length;
  //     if (level1Number) {
  //       for (let i = 0; i < 5; i++)
  //       level1Invitees.map((inviteeId) => {
  //         const invitedByInvitee = await BonusTree.find({ user_id: inviteeId }, 'invitees');
  //         level2Invitees.push()
  //       })
  //     } else {
  //       res.send({ invitees: 0 })
  //     }
  //   } catch (err) {

  //   }
  // },

};
