const router = require("express").Router();
const Queryframer = require("../AI/Queryframer");
// Define your routes here
// Example route
router.get("/example", (req, res) => {
  res.json({ message: "This is an example route" });
});


module.exports = router;