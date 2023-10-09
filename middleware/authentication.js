const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next)=>{
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader.startsWith('Bearer ')){
    res.status(403).json('jwt token not valid');
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token,process.env.JWT_SECRET)
    req.user = payload;
    //console.log(req.user);
    next()
  } catch (error) {
    res.status(401).json('You are not authenticated');
  }
}

const verifyTokenAndAuthorization = (req,res,next)=>{
  verifyToken(req,res,()=>{
    if(req.user.userId === req.params.id || req.user.isAdmin){
      next();
    }else{
      res.status(403).json('you are not allowed to do tht')
    }
  })
}

const verifyTokenAndAdmin = (req,res,next)=>{
  verifyToken(req,res,()=>{
    if(req.user.isAdmin){
      next()
    }else{
      res.status(403).json('you are not allowed to do tht');
    }
  })
}

module.exports = {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization
}