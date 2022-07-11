const express= require('express')
const authCheck= require('../middlewares/authCheck')
const postController = require('../controllers/postController')
const router = express.Router()
const multer= require('multer')
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/pics/')
    },
    filename: function(req,file,cb){
        cb(null,new Date().toISOString().slice(0,10)+file.originalname)
    }
})
const upload = multer({ storage:storage })

router.get('/getPosts',authCheck,postController.getPosts)

router.post('/createPost',authCheck,upload.single('pic'),postController.createPost)

router.post('/likePost/:postId',authCheck,postController.likePost)

router.delete('/deletePost/:postId',authCheck,postController.deletePost)

module.exports=router  