const router = require("express").Router();
const { update_user_profile_controller } = require("../controllers");
router.get("/:id", update_user_profile_controller.getUser);
router.get("/", update_user_profile_controller.allUser);

router.put("/:userId", update_user_profile_controller.update_user_profile);
module.exports = router;