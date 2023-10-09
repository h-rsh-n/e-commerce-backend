const User = require('../models/user');
const bcrypt = require('bcryptjs')

const updateUser = async (req,res)=>{
  const id = req.params.id;
  if(req.body.password){
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password,salt);
  }
  try {
    const user = await User.findByIdAndUpdate(id,req.body,{new:true});
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(err);
  }
}

const deleteUser = async (req,res)=>{
  const id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(id);
    res.status(200).json('the user is deleted')
  } catch (error) {
    res.status(500).json(error);
  }
}

const getUser = async (req,res)=>{
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    const{password,...others} = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
}

const getUsers = async (req,res)=>{
  //if query is new = true, returns last 5 users
  const query = req.params.new
  try {
    const users = query? await User.find().sort({_id:-1}).limit(5) : await User.find();
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json(error)
  }
}

const getStats = async (req,res)=>{
  
}

module.exports = {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  getStats
}