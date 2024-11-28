let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let MessageSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    flatID: {
      type: String,
      required: true,
    },
    senderID: {
      type: String,
      required: true,
    },
    created: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("message", Me);