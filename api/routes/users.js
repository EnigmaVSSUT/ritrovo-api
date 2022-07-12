const express = require("express");
const authCheck = require("../middlewares/authCheck");
const userController = require("../controllers/userController");
const router = express.Router();
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
s3 = new aws.S3();

aws.config.update({
  secretAccessKey: process.env.AWSSecretKey,
  accessKeyId: process.env.AWSAccessKeyId,
  region: "us-west-2",
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: process.env.bucketName,
    key: function (req, file, cb) {
      cb(null, Date.now().toString()); //use Date.now() for unique file keys
    },
  }),
});

router.post("/signup", userController.signUp);

router.post("/login", userController.logIn);

router.post("/follow/:id", authCheck, userController.followUser);

router.get("/getnotifs", authCheck, userController.getNotifs);

module.exports = router;
