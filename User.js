const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({}, { collection: "Students" });

// mongoose.model("Students", userSchema);

const userSchema = new mongoose.Schema(
  {
    username: String,
    branch: String,
    year: String,
    email: { type: String, unique: true },
    password: String,
    confirmpassword: String,
  },
  {
    collection: "Students",
  }
);

mongoose.model("Students", userSchema);
