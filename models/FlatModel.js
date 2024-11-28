let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let FlatSchema = new Schema(
  {
    city: {
      type: String,
      required: [true, "Must provide a city"],
    },
    streetName: {
      type: String,
      required: [true, "Must provide a street name"],
    },
    streetNumber: {
      type: String,
      required: [true, "Must provide a street number"],
    },
    areaSize: {
      type: Number,
      required: true,
    },
    hasAC: {
      type: String,
      enum: ["yes", "no"],
    },
    yearBuild: {
      type: Number,
      required: true,
    },
    rentPrice: {
      type: Number,
      required: true,
    },
    dateAvailable: {
      type: Date,
      required: true,
    },
    ownerID: {
      type: String,
      required: true,
    },
    created: {
      type: Date,
      default: Date.now,
    },
    updated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("flat", FlatSchema);