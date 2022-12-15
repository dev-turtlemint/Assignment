const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  number: String,
  email: String,
  time: { type: String, default: Date.now() },
  name: String,
});

const officeSchema = new mongoose.Schema(
  {
    date: String,
    seat: seatSchema,
  },
  {
    collection: "office",
  }
);

const model = mongoose.model("Office", officeSchema);

module.exports = model;
