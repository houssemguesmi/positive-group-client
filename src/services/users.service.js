const catchAsync = require("../utils/catchAsync");
const baseRepository = require("../repositories/base.repository")
const { generateCode } = require("../helpers");

module.exports = {
    createNewUser = async (userData, inviterCode) => {
        try {

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
            userData["accountType"] = "free";
            userData["invitees"] = []

            // Storing the user
            return repository.save(userData, User);


        } catch (error) {
            console.error(error)
        }
    }
}