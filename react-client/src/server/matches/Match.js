const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const stakeSchema = new Schema(
  {
    matchNo: Number,
    home: Number,
    away: Number,
    homeName: String,
    awayName: String,
    coefficient: Number,
    enable: Boolean,
    visability: Boolean,
  },
  { versionKey: false }
);
const Match = mongoose.model("Match", stakeSchema);

module.exports = Match;
