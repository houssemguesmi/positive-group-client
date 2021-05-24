const generateCode = require("./generateCode");
const bcrypt = require("bcrypt")

module.exports = async (userData, defaultInviter) => {
    try {
        userData["inviter"] = defaultInviter
        userData["code"] = generateCode()
        // Initializing the new user
        userData["password"] = await bcrypt.hash(userData.password, 10);
        userData["accountType"] = "free";
        userData["invitees"] = []
        return userData
    } catch (err) {
        console.error(err);
        throw err
    }
}