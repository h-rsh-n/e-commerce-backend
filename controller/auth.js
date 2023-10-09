const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req,res)=>{
  const{username,email,password} = req.body;
  const salt =await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(password,salt);
  const tempUser ={username,email,password:hashpassword};
  try {
    const user = await User.create(tempUser);
    res.status(201).json(user);
  } catch (error) {
    res.status(404).json(error);
  }
}

const login = async (req,res)=>{
  const{username,email,password} = req.body;
  if(!username || !password){
    res.status(404).json('username and password should be provided');
  }
  try {
    const user = await User.findOne({username})

    if(!user){
      res.status(404).json('user not found');
    }

    const checkPassword = await bcrypt.compare(password,user.password)
    if(!checkPassword){
      res.status(404).json('Invalid password');
    }

    const token = jwt.sign({userId:user._id,isAdmin:user.isAdmin},process.env.JWT_SECRET,{expiresIn:'3d'});
    const {...others} = user._doc;
    res.status(200).json({...others,token});
    
  } catch (error) {
    res.status(404).json(error);
  }
}


module.exports={
  register,
  login
}