const express=require('express');
const { validateSignUpData } = require('../utils/validation');
const User = require('../models/user');
const cookieParser=require("cookie-parser");
const authRouter=express.Router();
const bcrypt=require("bcrypt");
authRouter.post("/login",async(req,res)=>{  
    try{
        
       const {emailId,password}=req.body;
       const user=await User.findOne({emailId:emailId});
       if(!user)
       {
        throw new Error("Invalid credentials");
       }
       const isPasswordValid=await user.validatePassword(password);
       if(isPasswordValid)
       {

        //create a JWT token
        const token=await user.getJWT();
        console.log(token);

        //add the token to cookie and send the response back to the user

        res.cookie("token",token,{htttpOnly:true});
        res.send("Login Successful!!!");
       }
       else{
        throw new Error("password not correct");
       }

    }
    catch(err)
    {
        res.status(400).send("ERROR:"+err.message);
    }
})

authRouter.post("/signup",async(req,res)=>{

  //validation of data
  try{
     validateSignUpData(req);
     const { firstName,
        lastName,
        emailId,password}=req.body;
  //encrypt the password
    const passwordHash=await bcrypt.hash(password,10);
    console.log(passwordHash);

  //create a new instance of user model
     const user=new User({
        firstName,
        lastName,
        emailId,
        password:passwordHash,
     });
    
    await user.save();
    res.send("Data added successfully");
  }
  catch(err)
  {
    res.status(400).send("Error saving the data"+err.message);
  }
});

authRouter.post("/logout",async(req,res)=>{
    res.clearCookie("token");
    res.send("Logout successful!!");
})

module.exports=authRouter;