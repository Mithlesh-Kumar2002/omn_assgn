const router = require("express").Router();
const { user_controller } = require("../controllers");
router.post("/login", user_controller.login);
router.post("/signup", user_controller.signup);
module.exports = router;