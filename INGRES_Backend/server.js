// server.js
const express = require("express");
const path = require("path");
const mysql = require("mysql2");
require("dotenv").config();
const app = express();
const routes = require("./Routes/routes");
const mongoose = require("mongoose");
const cors = require("cors");

// -------------------------------------------------
// MIDDLEWARE
// -------------------------------------------------
app.use(express.json());

// -------------------------------------------------
// CORS FIX (Must be BEFORE all routes)
// -------------------------------------------------
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// -------------------------------------------------
// MYSQL (DON’T TOUCH — YOUR FRIEND’S WORK)
// -------------------------------------------------
const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("MySQL Connected!");
});

// -------------------------------------------------
// MONGO CONNECTION (ONLY ONCE)
// -------------------------------------------------
mongoose.connect(process.env.MONGO_URI, {
  dbName: "FORINGRES",
})
  .then(() => console.log("MongoDB Connected (FORINGRES)"))
  .catch((err) => console.log("MongoDB Error:", err));


// -------------------------------------------------
// AUTH ROUTES (ONLY ONCE)
// -------------------------------------------------
app.use("/auth", require("./Routes/auth_routes"));

// -------------------------------------------------
// AI + DATA RETRIEVAL ROUTES
// -------------------------------------------------
app.use("/", routes);

// -------------------------------------------------
// TEST ROUTE
// -------------------------------------------------
app.get("/", (req, res) => {
  res.send("hello world");
});

// -------------------------------------------------
// START SERVER
// -------------------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
