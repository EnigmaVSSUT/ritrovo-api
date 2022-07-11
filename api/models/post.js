const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  caption: String,
  username: { type: String, default: "none" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  pic: { type: String },
  pfp: { type: String },
  likes: {
    count: { type: Number, default: 0 },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  date: Date,
  location: String,
});

module.exports = mongoose.model("Post", postSchema);
 