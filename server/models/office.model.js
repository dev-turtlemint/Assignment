const mongoose = require("mongoose");

const officeSchema = new mongoose.Schema(
  {
    date: String,
    number: String,
    email: String,
    time: { type: Number, default: Date.now() },
    name: String,
  },
  {
    collection: "office",
  }
);

const model = mongoose.model("Office", officeSchema);

module.exports = model;
