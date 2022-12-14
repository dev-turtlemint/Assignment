const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  number: String,
  date: String,
  email: String,
  time: { type: String, default: Date.now() },
});

const officeSchema = new mongoose.Schema(
  {
    seat: seatSchema,
  },
  {
    collection: "office",
  }
);

const model = mongoose.model("Office", officeSchema);

module.exports = model;
