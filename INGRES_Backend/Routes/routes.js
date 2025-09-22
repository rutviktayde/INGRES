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


router.post("/api/chat", async(req, res) => {
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
    // the actaul work is done here🤖🤖🤖'
    answers = await Queryframer.main(message)
console.log('Back to routes.js');  
  if (answers != null){
    await response_gen.main(answers,message)
    response = {
      success: true,
      message: "Message received successfully",
      receivedMessage: message,
      timestamp: new Date().toISOString(),
      // You can add AI response here later
      aiResponse: `I received your message: "${message}". This is where the AI response would be generated.`
    };
  
  } 
  else{
       response = {
      success: true,
      message: "Message received successfully",
      receivedMessage: message,
      timestamp: new Date().toISOString(),
      // You can add AI response here later
      aiResponse: `I received your message: "${message}". There was error generating response Shivam is goat`
    };

  }
    // Here you can add your AI/ML processing logic
    // For now, we'll return a simple acknowledgment

// for now we will have to comment this part

    // const response = {
    //   success: true,
    //   message: "Message received successfully",
    //   receivedMessage: message,
    //   timestamp: new Date().toISOString(),
    //   // You can add AI response here later
    //   aiResponse: `I received your message: "${message}". This is where the AI response would be generated.`
    // };

    res.json(response);
  } catch (error) {
    console.error("Error processing chat message:", error);
    res.status(500).json({ 
      error: "Internal server error while processing chat message" 
    });
  }
});


module.exports = router;