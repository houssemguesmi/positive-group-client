module.exports = (userData) => {
    // Initializing the new user
    userData["password"] = await bcrypt.hash(userData.password, 10);
    userData["accountType"] = "free";
    userData["invitees"] = []
    return userData
}