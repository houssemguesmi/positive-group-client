const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activationCodeSchema = new Schema({
    code: String,
    isUsed: Boolean,
    usedBy: String
});

const ActivationCode = mongoose.model("ActivationCode", activationCodeSchema);

module.exports = ActivationCode;
