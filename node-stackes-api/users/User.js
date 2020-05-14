const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    isAdmin: {
      type: Boolean,
      default: false,
    },
    stakes: [
      {
        matchNo: Number,
        home: Number,
        away: Number,
      },
    ],
  },
  { versionKey: false }
);
const User = mongoose.model("User", userSchema);

module.exports = User;
