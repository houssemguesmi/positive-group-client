const User = require("../models/User");
const repository = require("../repositories/base.repository");
const bcrypt = require("bcrypt");
const BonusTree = require("../models/BonusTree")

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
                    res.status(201).send({
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
            res.status(500).error(error);
        }
    },

    signup: async (req, res) => {
        try {

            let inviterCode = req.body.code

            let userData = req.body;

            // Generating a code for the new user
            let newUserCode = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            for (var i = 0; i < 10; i++) {
                newUserCode += characters.charAt(Math.floor(Math.random() * charactersLength));
            }

            // Adding the generated code to the user
            userData["code"] = newUserCode;

            console.log(userData)

            if (userData.code) {

                console.log("======= Inviter Code", inviterCode)

                // Getting the invitor via his invitation code
                const inviter = await repository.findOne({ code: inviterCode }, User);

                console.log("======= Inviter", inviter)

                // Storing the inviterId in the new user
                userData["inviter"] = inviter._id;

                console.log(userData)
                // Hashing the password
                let hashedPassword = await bcrypt.hash(userData.password, 10);

                userData["password"] = hashedPassword

                // Storing the user
                const user = await repository.save(userData, User);

                // Getting Inviter's Bonus Tree
                const inviterBonusTree = await repository.findOne({ user_id: userData.inviter }, BonusTree)

                console.log("======= Inviter Bonus Tree", inviterBonusTree)

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
            res.status(201).send("Created!");
        } catch (error) {
            console.error(error)
            res.status(500).send(error);
        }
    },

    updatePassword: async (req, res) => {
        try {
            let payload = req.body.payload
            let user = await repository.findOne({ email: payload.email }, User);
            if (!bcrypt.compareSync(payload.oldPassword, user.password)) {
                res.status(401).send({ message: "Wrong old password!" });
            } else if (payload.newPassword == payload.oldPassword) {
                res.status(405).send({ message: "Same old and new password!" });
            } else {
                payload.newPassword = bcrypt.hashSync(payload.newPassword, 10);
                let updatedUser = await repository.findOneAndUpdate(
                    { email: payload.email },
                    { password: payload.newPassword },
                    User
                );
                res.status(200).send(updatedUser);
            }
        } catch (e) {
            res.status(500).error(error);
        }
    },

}