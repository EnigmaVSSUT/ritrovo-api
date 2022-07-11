const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: "" },
  pfp: {type:String,default:"uploads\\pfp\\default.jpg"},
  is_staff: { type: Boolean, default: false },
  posts: {
    count: { type: Number, default: 0 },
    post: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  likes: {
    count: { type: Number, default: 0 },
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  liked_posts: { 
    count: { type: Number, default: 0 },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  followers: {
    count: { type: Number, default: 0 },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  following: {
    count: { type: Number, default: 0 },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  notifications: {
    count: { type: Number, default: 0 },
    notifs: [
      {
        username: String,
        post: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
        },
        action: String,
        date: Date,
      },
    ],
  },
});

module.exports = mongoose.model("User", userSchema);
