const jwt =require("jsonwebtoken");
const User = require("../models/user");
async function userAuth(req,res,next){
    try{
         // read token from req cookie
  const {token}=req.cookies;
  if(!token)
  {
    throw new Error("Token is not valid!!!");
  }
    //validate the token
  const decodedObj= jwt.verify(token,"secretkeypasswordonlyserverknows");
  const {_id}=decodedObj;
   //find the user
  const user=await User.findById(_id);
  if(!user)
  {
    throw new Error("User not found");
  }
  req.user=user;
  next();

 
    }
    catch(err)
    {
        res.status(400).send("ERROR: "+err.message);
    }

};
module.exports=userAuth;