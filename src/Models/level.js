const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: { type: String, default: "" },
  userID: { type: String, default: "" },
  level: { type: Number, default: 0 },
  toplamXP: { type: Number, default: 0 },
  olanXP: { type: Number, default: 0 },
});

module.exports = model("level", schema);
