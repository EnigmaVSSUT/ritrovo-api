const mongoose = require("mongoose");
const Post = require("../models/post");
const User = require("../models/user");

module.exports.getPosts = async (req, res, next) => {
  const result = await Post.find().select('caption pic username date likes').exec();
  res.status(200).json(result);
};

module.exports.createPost = async (req, res, next) => {
  const datetime = new Date(); 
  const user = await User.findById(req.UserData.userId);
  const post = new Post({
    _id: mongoose.Types.ObjectId(),
    caption: req.body.caption,
    pic: req.file.path, 
    pfp: user.pfp,
    date: datetime.toISOString().slice(0, 10),
    user: req.UserData.userId, 
    username: user.username,
  });
  await post.save(); 
  res.json(post); 
};
 
module.exports.likePost = async (req, res, next) => {
  const id = req.params.postId;
  const post = await Post.findById(id).exec();
  const user = await User.findById(req.UserData.userId).exec();

  if (post.likes.users.includes(req.UserData.userId)) {
    post.likes.users.remove(req.UserData.userId);
    post.likes.count--;
    user.liked_posts.count--;
    user.liked_posts.posts.remove(id);

    await post.save();
    await user.save();

    return res.status(200).json({
      msg: "post unliked",
    });
  } else {
    const datetime = new Date();
    post.likes.users.push(req.UserData.userId);
    post.likes.count++;
    user.liked_posts.count++;
    user.liked_posts.posts.push(id);
    const receiver = await User.findById(post.user).exec();

    if (receiver.username != user.username) {
      receiver.notifications.count++;
      receiver.notifications.notifs.push({
        username: user.username,
        post: id,
        action: "like",
        date: datetime.toISOString().slice(0, 10),
      });
    }

    await post.save();
    await user.save();
    await receiver.save();

    return res.status(200).json({
      msg: "post liked",
    });
  }
};
