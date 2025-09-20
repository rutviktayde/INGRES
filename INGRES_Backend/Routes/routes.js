const router = require("express").Router();
// Define your routes here
// Example route
router.get("/example", (req, res) => {
  res.json({ message: "This is an example route" });
});


module.exports = router;