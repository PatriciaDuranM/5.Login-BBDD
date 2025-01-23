const mongoose = require("mongoose");
const UserScheme = mongoose.Schema(
  {
    password: String,
    _id: String,
    email: String,
  },
  { collection: "users" }
);

module.exports = UserScheme;
