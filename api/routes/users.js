const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authCheck = require("../middlewares/authCheck");
const multer= require('multer')
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/pfp/')
    },
    filename: function(req,file,cb){
        cb(null,new Date().toISOString().slice(0,10)+file.originalname)
    }
})
const upload = multer({ storage:storage })

router.post("/signup", userController.signUp);

router.post("/login", userController.logIn);

router.post("/follow/:id", authCheck, userController.followUser);

router.get("/getnotifs", authCheck, userController.getNotifs);

router.post("/updateprofile", authCheck,upload.single('pfp'), userController.updateProfile);

module.exports = router;
