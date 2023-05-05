const express = require("express"); // creating Express Application.
const app = express();
app.use(express.json()); // to use json format for data transfer.

const mongoose = require("mongoose"); //for connection with mongoDB

const cors = require("cors"); // for cross origin data transfer between applications.
app.use(cors()); //using cors in our express application.

const bcrypt = require("bcrypt"); //for encrypting our passwords.

const jwt = require("jsonwebtoken"); //for using JWT in other application.
//creating secret key, on the basis of which JWT token will be generated.
const JWT_SECRET = process.env.JWT_SECRET;

const session = require("express-session"); // for using sessions in our application.
const cookieParser = require("cookie-parser"); //  for using cookie in our application.
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

//connecting with our mongoDB database using cloud mongoUrl

mongoUrl = process.env.MONGO_URL;

mongoose
  .connect(mongoUrl, { useNewUrlParser: true })
  .then(() => {
    //this is for connecting with local database.
    // mongoose
    //   .connect("mongodb://127.0.0.1:27017/GLP", { useNewUrlParser: true })
    //   .then(() => {
    console.log("Connected to Database!!");
  })
  .catch((e) => {
    console.log(e);
  });

//base api for checking the connection.
app.get("/", async (req, res) => {
  res.send("working");
});

//creating API that will fetch all the users available in the database.
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

//this API will fetch data from the Databae on the basis of parameters mentioned.
require("./User");
const FilteredUser = mongoose.model("Students");
app.get("/getFilteredUser", async (req, res) => {
  const { uname, domain } = req.query;
  try {
    const allUser = await FilteredUser.find({ Domain: domain, Name: uname });
    console.log(allUser);
    res.json({ status: "ok", data: allUser });
  } catch (error) {
    console.log(error);
  }
});

// This post API  is used for login Purpose, it takes email, and passwords, checks if the given email exists in database if not returns error, else converts the password into hashes and compares it with password hash in the database.

app.post("/Userlogin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.json({ error: "Invalid Credentials" });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email }, JWT_SECRET);
      if (res.status(201)) {
        return res.json({ status: "ok", data: { User } });
      } else {
        return res.json({ error: "error" });
      }

      req.session.userId = user.email;
      res.send("Logged in");

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

//This API creates a user in Database.
app.post("/UserCreate", async (req, res) => {
  const { username, branch, year, email, password, confirmpassword } = req.body;
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
