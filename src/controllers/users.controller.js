require("dotenv").config();
const User = require("../models/User");
const BonusTree = require("../models/BonusTree")
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

      if (userData.code) {

        // Getting the invitor via his invitation code
        const inviter = await repository.findOne({ code: userData.code }, User);

        // Storing the inviterId in the new user
        userData.inviter = inviter._id;
        // Hashing the password
        userData.password = await bcrypt.hash(userData.password, 10);

        // Storing the user
        const user = await repository.save(userData, User);

        // Getting Inviter's Bonus Tree
        const inviterBonusTree = await BonusTree.findOne({ user_id: userData.inviter })

        // Checking if BonusTree exists for the inviter and Adding invitee
        if (inviterBonusTree) {

          await BonusTree.updateOne({ user_id: userData.inviter }, { $addToSet: { invitees: user._id } })

        } else {

          let inviterData = {
            user_id: userData.inviter,
            invitees: [user._id]
          }
          await BonusTree.create(inviterData)

        }


      } else {

        // Storing the user
        await repository.save(userData, User);

      }

      // Sending back the response
      res.status(201).send({ message: "Created!" });
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
