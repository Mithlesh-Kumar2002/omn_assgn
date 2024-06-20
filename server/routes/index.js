const router = require("express").Router();
router.get("/", (req, res) => {
  res.send("you are in the root route.");
});
router.use("/auth", require("./user_route"));
router.use("/profile" ,require("./profile_route"));
router.use("/car",require("./car_route"))
module.exports = router;