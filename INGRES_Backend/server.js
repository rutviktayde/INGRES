// server.js
const express = require("express");
const path = require("path");
require("dotenv").config();
const app = express();
const routes = require("./Routes/routes");
app.use(express.json());

// Allow CORS during development only (adjust origin in production)
if (process.env.NODE_ENV !== "production") {
  const cors = require("cors");
  app.use(cors({ origin: "http://localhost:5173" })); // Vite default
}
/* ---------- API routes ---------- */
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from INGRES backend" });
});

// Add more API routes under /api here
// app.use('/api/users', require('./routes/users'));

/* ---------- Serve frontend build in production ---------- */
const viteDist = path.join(__dirname, "..", "FrontEnd", "dist"); // Vite -> dist
const craBuild = path.join(__dirname, "..", "FrontEnd", "build"); // CRA -> build

const staticFolder = require("fs").existsSync(viteDist)
  ? viteDist
  : require("fs").existsSync(craBuild)
  ? craBuild
  : null;

if (staticFolder) {
  app.use(express.static(staticFolder));
  // For client-side routing — return index.html for all non-API GETs
  app.get("*", (req, res) => {
    if (req.path.startsWith("/api"))
      return res.status(404).json({ error: "Unknown API route" });
    res.sendFile(path.join(staticFolder, "index.html"));
  });
}

app.get("/", (req, res) => {
  res.send("hello world");
});

// Chat API route for Jal Sathi
app.post("/api/chat", (req, res) => {
  try {
    const { message, timestamp } = req.body;
    
    // Validate the request
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ 
        error: "Message is required and must be a string" 
      });
    }

    // Log the received message
    console.log(`Received chat message: ${message}`);
    console.log(`Timestamp: ${timestamp || new Date().toISOString()}`);

    // Here you can add your AI/ML processing logic
    // For now, we'll return a simple acknowledgment
    const response = {
      success: true,
      message: "Message received successfully",
      receivedMessage: message,
      timestamp: new Date().toISOString(),
      // You can add AI response here later
      aiResponse: `I received your message: "${message}". This is where the AI response would be generated.`
    };

    res.json(response);
  } catch (error) {
    console.error("Error processing chat message:", error);
    res.status(500).json({ 
      error: "Internal server error while processing chat message" 
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}/`)
);
