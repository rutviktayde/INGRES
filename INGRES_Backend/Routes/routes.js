const router = require("express").Router();
const Queryframer = require("../AI/Queryframer");
// Define your routes here
// Example route
router.post("/example", (req, res) => {
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

module.exports = router;