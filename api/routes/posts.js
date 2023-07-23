const express = require("express");
const authCheck = require("../middlewares/authCheck");
const postController = require("../controllers/postController");
const userController = require("../controllers/userController");
const router = express.Router();
const multer = require("multer");
// const multerS3 = require("multer-s3");
// const aws = require("aws-sdk");
// s3 = new aws.S3();

// aws.config.update({
//   secretAccessKey: process.env.AWSSecretKey,
//   accessKeyId: process.env.AWSAccessKeyId,
//   region: "us-west-2",
// });

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     acl: "public-read",
//     bucket: process.env.bucketName,
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString()); //use Date.now() for unique file keys
//     },
//   }),
// });
const fileStorage = multer.diskStorage({
  destination:  '../uploads',
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().substring(0,10) + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload =  multer({ storage: fileStorage, fileFilter: fileFilter });

router.get("/getPosts", authCheck, postController.getPosts);

router.post(
  "/createPost",
  authCheck,
  upload.single("pic"),
  postController.createPost
);

router.post(
  "/updateprofile",
  authCheck,
  upload.single("pfp"),
  userController.updateProfile
);

router.post("/likePost/:postId", authCheck, postController.likePost);

router.delete("/deletePost/:postId", authCheck, postController.deletePost);

module.exports = router;
