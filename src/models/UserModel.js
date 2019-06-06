import mongoose from "mongoose";
require("dotenv").config();

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true });
// mongoose.connect(process.env.DB_CONN, { useNewUrlParser: true });
let db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback) {
  console.log("connection succeeded");
});

let user_model = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  admin: String
});

module.exports = mongoose.model("user_model", user_model);
