const router = require("express").Router();
const Queryframer = require("../AI/Queryframer");
// Define your routes here
// Example route
router.get("/example", (req, res) => {
  Queryframer.main();
});


module.exports = router;