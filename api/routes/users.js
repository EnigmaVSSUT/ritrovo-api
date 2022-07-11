const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authCheck = require("../middlewares/authCheck");

router.post("/signup", userController.signUp);

router.post("/login", userController.logIn);

router.post("/follow/:id", authCheck, userController.followUser);

router.get("/getnotifs", authCheck, userController.getNotifs);

module.exports = router;
