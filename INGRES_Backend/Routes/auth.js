const router = require("express").Router();
const nodemailer = require("nodemailer");
const User = require("../Model/User");

// SMTP transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASS
  }
});

// 📌 SEND OTP
router.post("/send-code", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(400).json({ error: "Email is required" });

    // generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // save/update user OTP
    await User.findOneAndUpdate(
      { email },
      { otp, time_of_ver: new Date() },
      { upsert: true, new: true }
    );

    // send email
    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: "Your INGRES Login Code",
      html: `<h2>Your Login Code</h2><p style="font-size:22px;"><b>${otp}</b></p>`
    });

    res.json({ success: true, message: "OTP sent" });
  } catch (err) {
    console.log("OTP ERROR:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 📌 VERIFY OTP
router.post("/verify-code", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ error: "User not found" });

    if (user.otp !== otp)
      return res.status(400).json({ error: "Incorrect OTP" });

    res.json({ success: true, message: "OTP Verified", user });
  } catch (err) {
    console.log("VERIFY ERROR:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
