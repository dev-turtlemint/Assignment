const express = require("express");

const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { json } = require("body-parser");

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
      return res.json({ status: "ok", user: true });
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

app.get("/api/seat", async (req, res) => {
  const token = req.headers["x-access-token"];
  const data = JSON.parse(token);

  try {
    const decoded = jwt.verify(data.token, "secret123");
    const email = decoded.email;
    const user = await User.findOne({ email: email });

    return res.json({ status: "ok", seat: user.seat });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "Invalid token" });
  }
});

app.post("/api/seat", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    q;
    await User.updateOne({ email: email }, { $set: { seat: req.body.seat } });
    console.log(email, req.body.seat);

    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "Invalid token" });
  }
});

app.listen(1337, () => {
  console.log("Server has started on 1337");
});
