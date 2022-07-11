const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose')

module.exports.signUp = async (req, res, next) => {
  const check = await User.findOne({ username: req.body.username });
  if (check != null)
    return res.status(400).json({ msg: "username already exists" });

  const hashed = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    username: req.body.username,
    password: hashed,
  });

  await user.save();

  const token = jwt.sign( 
    {
      username: user.username,
      userId: user._id,
    },
    process.env.jwt_key,
    { expiresIn: "60 days" }
  );

  res.status(201).json({
    msg: "user created successfully",
    token: token,
    user: user,
  });
};

module.exports.logIn = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });

  if (user==null) { 
    return res.status(400).json({ msg: "Authentication failed" });
  }
  const chk = await bcrypt.compare(req.body.password, user.password);

  if (!chk) { 
    return res.status(400).json({ msg: "Authentication failed" });
  }

  const token = jwt.sign(
    {
      username: user.username,
      userId: user._id,
    },
    process.env.jwt_key,
    { expiresIn: "60 days" }
  );

  res.status(200).json({
    msg: "logged in successfully",
    token: token,
    user: user,
  });
};

module.exports.followUser = async(req,res,next) => {
  const id=req.params.id;

  const receiver =await User.findById(id).exec()
  const sender = await User.findById(req.UserData.userId).exec()

  if(receiver.followers.users.includes(req.UserData.userId)){
    await receiver.followers.users.remove(req.UserData.userId) 
    await sender.following.users.remove(id) 
    receiver.followers.count-- 
    sender.following.count--
    receiver.save()
    sender.save() 

    return res.status(200).json({msg:'unfollowed user'})
  }
  else{
    await receiver.followers.users.push(req.UserData.userId) 
    await sender.following.users.push(id) 
    receiver.followers.count++
    sender.following.count++
    receiver.save() 
    sender.save() 
    return res.status(200).json({msg:'followed user'})
  }

}

module.exports.getNotifs = async (req,res,next) =>{
  const user= await User.findById(req.UserData.userId).exec()

  const notifs= user.notifications

  res.status(200).json(notifs)
}

module.exports.updateProfile = async (req,res,next)=>{
  if(req.file.location!=null){
    req.body.pfp=req.file.location
  }

  const user =await User.findOneAndUpdate({'_id':req.UserData.userId},req.body).exec()
  res.status(200).json({
    msg:'updated successfully',
    user:user
  })
} 