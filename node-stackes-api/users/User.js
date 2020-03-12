const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({username: String, password: String, firstName: String, lastName: String}, {versionKey: false});
const User = mongoose.model("User", userSchema);



module.exports = User;