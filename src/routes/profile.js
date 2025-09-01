const express=require('express');
const profileRouter=express.Router();
profileRouter.get("/profile",userAuth,async(req,res)=>{
    try{
        const user=req.user;
        res.send(user);
    }
    catch(err)
    {
        res.status(400).send("ERROR : "+err.message);
    }
    // const cookies=req.cookies;
    // const {token}=cookies;
    // if(!token)
    // {
    //     throw new Error("Invalid Token");
    // }
    // //validate my token
    // const decodedMessage=await jwt.verify(token,"secretkeypasswordonlyserverknows")
    // const {_id}=decodedMessage;
    // console.log("loggedIn user is:"+_id);
    // const user=await User.findById(_id);
    // if(!user)
    // {
    //     throw new Error("user does not exist");
    // }
   
    // res.send(user);

});
module.exports=profileRouter;