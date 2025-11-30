const express = require("express");
const router = express.Router();
const User = require("../Model/User");     // ✔ correct path
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// -------------------------
// SEND CODE
// -------------------------
router.post("/send-code", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const passcode = Math.floor(100000 + Math.random() * 900000);
    const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    await User.findOneAndUpdate(
      { email },
      { passcode, passcodeExpires: expiry, time_of_ver: null },
      { upsert: true, new: true }
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: "Your INGRES Verification Code",
      text: `Your login code is ${passcode}. (Valid for 5 minutes)`
    });

    res.json({ success: true, message: "Code sent" });

  } catch (err) {
    console.error("Send-code ERROR:", err);
    res.status(500).json({ error: "Server error sending code" });
  }
});

// -------------------------
// VERIFY CODE
// -------------------------
router.post("/verify-code", async (req, res) => {
  try {
    const { email, passcode } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.passcodeExpires < new Date()) {
      return res.status(401).json({ error: "Code expired" });
    }

    if (user.passcode != passcode) {
      return res.status(401).json({ error: "Invalid code" });
    }

    user.time_of_ver = new Date();
    await user.save();

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ success: true, token });

  } catch (err) {
    console.error("Verify ERROR:", err);
    res.status(500).json({ error: "Server error verifying code" });
  }
});

module.exports = router;
