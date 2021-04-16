const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema({
    userId: { type: String },
    totalBonus: { type: number },
    isPaid: { type: Boolean, default: false }
});

const FundRequest = mongoose.model("FundRequest", requestSchema);

module.exports = FundRequest;
