const User = require("../models/User");
const repository = require("../repositories/base.repository");

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
            res.status(500).error(error);
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
            res.status(500).error(error);
        }
    },

}