const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  number: String,
  date: { type: Date, default: Date.now },
  email: String,
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
