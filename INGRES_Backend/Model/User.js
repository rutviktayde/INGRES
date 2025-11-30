const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },

  passcode: { type: Number, required: true },

  passcodeExpires: { type: Date, required: true },  // OTP expiry

  time_of_ver: { type: Date, default: null }        // successful verification time
});

module.exports = mongoose.model("User", UserSchema);
