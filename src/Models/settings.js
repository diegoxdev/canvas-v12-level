const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: { type: String, default: "" },
  level: Number,
  roles: Array,
  channel: {type:String, default: null},
});

module.exports = model("ranks", schema);
