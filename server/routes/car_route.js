const router = require("express").Router();
const { car_controller } = require("../controllers");
const { upload } = require("../middlewares/upload_middleware");

// const { auth } = authMiddleware;
router.post("/", upload.array('images',1), car_controller.add_new_car);
router.get("/",car_controller.get_cars);
router.get("/:carId",car_controller.get_car);
router.put("/:carId", car_controller.update_cars);
router.delete("/:carId", car_controller.delete_car);
module.exports = router;