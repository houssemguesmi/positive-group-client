const catchAsync = require("../utils/catchAsync");
const baseRepository = require("../repositories/base.repository")
const { generateCode } = require("../helpers");
const { initializeUser } = require("../helpers/initializeUser")

module.exports = {

    createUninvitedUser: async (userData) => {
        try {
            userData = initializeUser(userData)
            return repository.save(userData, User);
        } catch (error) {
            console.error(error)
        }
    },

    createNewUserInvitedByCode: async (userData, inviterCode) => {
        try {

            // Adding the generated code to the user
            userData["code"] = generateCode();

            // Getting the invitor via his invitation code
            const inviter = await repository.findOne({ code: inviterCode }, User);

            // Storing the inviterId in the new user
            userData["inviterCode"] = inviter._id;

            // Initializing the new user
            userData = initializeUser(userData)

            // Storing the user
            return repository.save(userData, User);


        } catch (error) {
            console.error(error)
        }
    },

    createNewUserInvitedByEmail: async (userData, inviterEmail) => {
        try {

            // Adding the generated code to the user
            userData["code"] = generateCode();

            // Getting the invitor via his invitation code
            const inviter = await repository.findOne({ email: inviterEmail }, User);
            userData["inviterEmail"] = inviter._id;

            userData = initializeUser(userData)

            // Storing the user
            return repository.save(userData, User);


        } catch (error) {
            console.error(error)
        }
    }

}