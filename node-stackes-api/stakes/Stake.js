const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const stakeSchema = new Schema({
    match: String, 
    user: {
               type: Schema.Types.ObjectId,
               ref: "User"
    } 
}, {versionKey: false});
const Stake = mongoose.model("Stake", stakeSchema);

module.exports = Stake;