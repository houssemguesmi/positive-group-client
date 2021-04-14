const User = require("../models/User");
const repository = require("../repositories/base.repository");
const bcrypt = require("bcrypt");

const { generateCode } = require("../helpers");

module.exports = {

    login: async (req, res) => {
        try {
            const userData = await repository.findOne({ email: req.body.email }, User);
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
            let inviterCode = req.body.code;
            let userData = req.body;

            // Generating a code for the new user
            let newUserCode = generateCode()

            // Adding the generated code to the user
            userData["code"] = newUserCode;

            if (inviterCode) {

                // Getting the invitor via his invitation code
                const inviter = await repository.findOne({ code: inviterCode }, User);
                userData["inviter"] = inviter._id;
            }

            // Hashing the password
            let hashedPassword = await bcrypt.hash(userData.password, 10);

            // Storing the inviterId in the new user
            userData["password"] = hashedPassword
            userData["isActivated"] = false;
            userData["invitees"] = []

            // Storing the user
            const user = await repository.save(userData, User);

            inviterCode && await User.findByIdAndUpdate({ _id: userData.inviter }, { $push: { invitees: user._id } })

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