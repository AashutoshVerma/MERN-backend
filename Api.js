const express = require("express");
const app = express();
app.use(express.json());

const mongoose = require("mongoose");

const cors = require("cors");
app.use(cors());
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const JWT_SECRET =
  "dkflj9354dklfj309574dlkfj430958lkdjf430985klfj3098538jfdkfjd903583k3n3kj3l5j3k53n5jj5n";

const session = require("express-session");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // Expires in 30 days
  })
);

app.listen(5000, () => {
  console.log("Server Started");
});

mongoUrl =
  // "mongodb+srv://admin:pass@cluster0.ls2tvf7.mongodb.net/GLP?retryWrites=true&w=majority";
  "mongodb+srv://admin:pass@cluster0.ls2tvf7.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(mongoUrl, { useNewUrlParser: true })
  .then(() => {
    // mongoose
    //   .connect("mongodb://127.0.0.1:27017/GLP", { useNewUrlParser: true })
    //   .then(() => {
    console.log("Connected to Database!!");
  })
  .catch((e) => {
    console.log(e);
  });

app.get("/", async (req, res) => {
  res.send("working");
});

require("./User");
const User = mongoose.model("Students");
app.get("/getAllUser", async (req, res) => {
  try {
    const allUser = await User.find({});
    res.send({ status: "ok", data: allUser });
  } catch (error) {
    console.log(error);
  }
});

require("./User");
const FilteredUser = mongoose.model("Students");
app.get("/getFilteredUser", async (req, res) => {
  // const username = req.query.username;
  // const email = req.query.email;
  // const domain = req.query.domain;
  // const params = req.query.param;
  const { uname, domain } = req.query;
  try {
    const allUser = await FilteredUser.find({ Domain: domain, Name: uname });
    console.log(allUser);
    res.json({ status: "ok", data: allUser });
  } catch (error) {
    console.log(error);
  }
});

app.post("/Userlogin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.json({ error: "Invalid Credentials" });
    }

    if (await bcrypt.compare(password, user.password)) {
      // const token = jwt.sign({ email }, JWT_SECRET);
      // if (res.status(201)) {
      //   // return res.json({ status: "ok1" });
      //   return res.json({ status: "ok", data: { User } });
      // } else {
      //   return res.json({ error: "error" });
      // }

      // req.session.userId = user.email;
      // res.send("Logged in");

      return res.json({
        status: "ok",
        username: user.username,
        email: user.email,
        password: user.password,
      });
    }
    res.json({ status: "error", error: "Invalid Credentials" });
  } catch (error) {
    console.log(error);
  }
});

app.post("/UserCreate", async (req, res) => {
  const { username, branch, year, email, password, confirmpassword } = req.body;
  // console.log(req.body);
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.send({ error: "User Exists" });
    }
    await User.create({
      username,
      branch,
      year,
      email,
      password: encryptedPassword,
      confirmpassword: encryptedPassword,
    });
    res.send({ status: "OK" });
  } catch (error) {
    res.send({ status: "NOT OK" });
  }
});
