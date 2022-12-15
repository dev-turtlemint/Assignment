const express = require("express");

const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { json } = require("body-parser");
const Office = require("./models/office.model.js");

app.use(cors());
app.use(express.json());

//to remove warning the `strictQuery` option will be switched back to `false` by default in Mongoose 7
mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  });

app.post("/api/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.json({ status: "error", error: "Invalid Login" });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (isPasswordValid) {
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
        },
        "secret123"
      );
      return res.json({ status: "ok", user: true, token: token });
    } else {
      return res.json({ status: "error", user: false });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/register", async (req, res) => {
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });
    res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "Duplicate email" });
  }
});

app.post("/api/booking", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "secret123");
    const seatNo = req.body.seat;
    const date = req.body.date;
    const record = {
      date: date,
      seat: {
        number: String(JSON.parse(seatNo)),
        email: decoded.email,
        time: Date.now() / 1000,
        name: decoded.name,
      },
    };
    const response = await Office.create(record);

    res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({
      status: "error",
      error: "Something went wrong, try again later!",
    });
  }
});

app.get("/api/dashboard", async (req, res) => {
  try {
    const record = await Office.find({});
    return res.json({ record, status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "Data not found!" });
  }
});

app.post("/api/update", async (req, res) => {
  try {
    const { old: oldSeat, new: newSeat } = req.body;
    const response = await Office.updateOne(
      {
        seat: oldSeat,
      },
      {
        $set: {
          seat: newSeat,
        },
      }
    );
    res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({
      status: "error",
      error: "Something went wrong, try again later!",
    });
  }
});

app.post("/api/delete", async (req, res) => {
  const token = req.headers["x-access-token"];
  const date = req.body.date;
  const seat = req.body.seat;
  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    const user = await Office.findOneAndDelete({
      "seat.email": email,
      "seat.date": date,
      "seat.number": seat,
    });
    return res.json({ status: "Deleted" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "Error" });
  }
});

app.get("/api/profile", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    const user = await Office.find({ "seat.email": email });
    return res.json({ status: "ok", user: user });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "Error" });
  }
});

app.listen(1337, () => {
  console.log("Server has started on 1337");
});
