const router = require("express").Router();
const Queryframer = require("../AI/Queryframer");
let { data_retrive } = require("../Routes/data_retrive");
const response_gen = require('../AI/response_gen')
let answers = null;
let response;
// Define your routes here
// Example route
router.post("/example", (req, res) => {
  console.log("This is /example controller 🫡🫡:")
  const query=req.body.query;
Queryframer.main(query)
  .then(() => {
    res.status(200).json({ message: "Query processed" });
  })
  .catch((error) => {
    console.error("Error processing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  });
});


router.post("/api/chat", async (req, res) => {
  try {
    let { message, timestamp } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Message is required and must be a string",
      });
    }

    console.log(`Received chat message: ${message}`);
    console.log(`Timestamp: ${timestamp || new Date().toISOString()}`);

    const answers = await Queryframer.main(message);
    let response;

    if (answers) {
      console.log("Generated answer from Queryframer");

      const lowerMessage = message.toLowerCase();
      const chatfromai = await response_gen.main(answers, lowerMessage);

      response = {
        success: true,
        message: "Message received successfully",
        receivedMessage: lowerMessage,
        timestamp: new Date().toISOString(),
        aiResponse: chatfromai,
      };
    } else {
      response = {
        success: true,
        message: "Message received successfully",
        receivedMessage: message,
        timestamp: new Date().toISOString(),
        aiResponse: `I received your message: "${message}". There was an error generating response. Shivam is goat.`,
      };
    }

    res.json(response);
  } catch (error) {
    console.error("Error processing chat message:", error);
    res.status(500).json({
      error: "Internal server error while processing chat message",
    });
  }
});



module.exports = router;