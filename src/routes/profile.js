const express=require('express');

const profileRouter=express.Router();
//const User = require('../models/user');
const userAuth = require('../middlewares/auth');
const validation = require("../utils/validation");
const bcrypt=require("bcrypt");
// Access functions safely
const { validateEditProfileData } = validation;

profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{
        const user=req.user;
        res.send(user);
    }
    catch(err)
    {
        res.status(400).send("ERROR : "+err.message);
    }

});
profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
  
    try{
          if(!validateEditProfileData(req))
          {
            throw new Error("Edit not allowed");
          }
        const loggedInUser=req.user;
        await loggedInUser.save();
        Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]));
        res.json({message:`${loggedInUser.firstName},your profile updated successfully`,data:loggedInUser,});
    }
    catch(err)
    {
        res.status(400).send("ERROR : "+err.message);
    }

});

profileRouter.patch("/profile/forgot-password", userAuth, async (req, res) => {
  try {
    const { newPassword } = req.body;

    // 1. Validate input
    if (!newPassword) {
      return res.status(400).json({ error: "New password is required" });
    }

    if (newPassword.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters long" });
    }

    // 2. Get logged-in user from req.user (set by userAuth middleware)
    const user = req.user;

    // 3. Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 4. Update only password field
    user.password = hashedPassword;
    await user.save();
    console.log(user.password);
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
});


module.exports=profileRouter;