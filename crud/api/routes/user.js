const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const CheckAuthToken = require("../middleware/auth");

router.post("/create", CheckAuthToken, userController.createUser);
router.get("/read-all", CheckAuthToken, userController.readAllUsers);
router.get("/get/:id", CheckAuthToken, userController.readUserDetail);
router.post("/update/:id", CheckAuthToken, userController.updateUserDetails);
router.delete("/delete/:id", CheckAuthToken, userController.DeleteUserDetails);

module.exports = router;
