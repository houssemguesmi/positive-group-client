require("dotenv").config();
const User = require("../models/User");
const BonusTree = require("../models/BonusTree");
const ActivationCode = require("../models/ActivationCode");

const repository = require("../repositories/base.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");

const catchAsync = require("../utils/catchAsync")

module.exports = {

  updateUser: async (req, res) => {
    try {
      let newUser = await repository.findOneAndUpdate({ _id: req.params.userId }, req.body.payload, User);
      res.status(200).send(newUser);
    } catch (e) {
      res.status(500).send(e);
    }
  },

  getUserByToken: async (req, res) => {
    try {
      let userEmail = jwtDecode(req.params.token).email;
      let user = await repository.findOne({ email: userEmail }, User);
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
      let code = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      for (var i = 0; i < 10; i++) {
        code += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      // Adding the generated code to the user
      user["code"] = code;
      // Saving the new user to the Database
      await repository.save(user, User);
      // Returning the response
      res.status(200).send({ code: code })
    } catch (error) {
      console.error(error);
      res.status(500).send();
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

  getInvitees: async (req, res) => {
    // Get user id from params
    let userId = req.params.userId;

    // Get level 1 invitees
    let user = await User.findById(userId);
    let level1Invitees = user.invitees, isUserActivated = user.isActivated;

    let response = {}

    for (let i = 1; i <= 10; i++) {
      response[`level${i}Invitees`] = []
    }

    await Promise.all(level1Invitees.map(async (invitee) => {
      let currentInvitee = await User.findById(invitee);
      let responseInvitee = {
        inviteeId: invitee,
        isActivated: currentInvitee.isActivated
      }
      response.level1Invitees.push(responseInvitee)
    }))

    res.send(response)


  },

  getInviteesDEPRECATED: async (req, res) => {
    try {
      // Get user id from params
      let userId = req.params.userId;

      // Get level 1 invitees
      let level1BonusTree = await BonusTree.find({ user_id: userId }).select({ "invitees": 1, "_id": 0 });
      let level1Invitees = level1BonusTree[0].invitees;

      let response = {}

      for (let i = 1; i <= 10; i++) {
        response[`level${i}Invitees`] = []
      }

      Promise.all(level1Invitees.map(async (invitee) => {
        let currentInvitee = await User.findById(invitee);
        let isInviteeActivated = currentInvitee.isActivated;
        let responseInvitee = {
          inviteeId: invitee,
          isActivated: isInviteeActivated
        }
        response.level1Invitees.push(responseInvitee)
      }))


      if (response.level1Invitees) {

        for (let i = 1; i < 10; i++) {

          try {
            await Promise.all(
              response[`level${i}Invitees`].map(async (invitee) => {
                console.log("yo")
                let invitedUsers = await BonusTree.findOne({ user_id: invitee.inviteeId }).select({ "invitees": 1, "_id": 0 })
                if (invitedUsers) {
                  await Promise.all(invitedUsers.map(async (inviteeId) => {
                    let currentInvitee = await User.findById(inviteeId);
                    console.log("============ invitee: ", currentInvitee)
                    let responseInvitee = {
                      inviteeId: inviteeId,
                      isActivated: currentInvitee.isActivated
                    }
                    response[`level${i + 1}Invitees`].push(responseInvitee)
                    // response[`level${i + 1}Invitees`] = response[`level${i + 1}Invitees`].concat(invitedUsers.invitees)
                  }))
                }
              })
            )
          } catch (err) {
            console.error(err)
          }
        }
      }

      res.send(response)

    } catch (error) {
      console.error(error);
      res.status(500).send(error)
    }
  },

  getBonus: async (req, res) => {
    try {
      let invitees = await this.getInvitees(req, res);
      let bonus = 0;
    } catch (error) {
      console.error(error);
      res.status(500).send(error)
    }
  },

  activateAccount: async (req, res) => {
    try {
      let userId = req.params.userId;
      let activationCodeStatus = await ActivationCode.findOne({ code: req.body.code }, 'isUsed');
      if (!activationCodeStatus) {
        await ActivationCode.findOneAndUpdate({ code: req.body.code }, { isUsed: true, usedBy: userId });
      } else {
        res.status(405).send("Code is already used!")
      }
      let user = await User.findByIdAndUpdate({ _id: userId }, { isActivated: true })
      console.log(user)
      res.status(200).send(user)
    } catch (error) {
      console.error(error);
      res.status(500).send(error)
    }
  }

};
