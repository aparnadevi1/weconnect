const express = require("express");
const userAuth = require("../middlewares/auth");
const User = require('../models/user');
const ConnectionRequest = require("../models/connectionRequest");
const requestRouter=express.Router();
requestRouter.post("/request/send/:status/:userId",userAuth,async(req,res)=>{

    try{
               const fromUserId=req.user._id;
               const toUserId=req.params.userId;
               const status=req.params.status;


                const allowedStatus=["interested","ignored"];
                if(!allowedStatus.includes(status))
                {
                  return res.status(400).json({
                    message:"Invalid status type"+status
                   });
                }


                const toUser=await User.findById(toUserId);
                if(!toUser)
                {
                   return res.status(400).json({
                    message:"User not found"
                   });
                }
               const existingConnetionRequest=await ConnectionRequest.findOne(
                {$or:[
                  {fromUserId,toUserId},
                  {fromUserId:toUserId,toUserId:fromUserId}
                ],
              });
                if(existingConnetionRequest)
                {
                  return res.status(400).json({
                    message:"Connection request already exists"
                   });
                }

               const connectionRequest=new ConnectionRequest({
               fromUserId,toUserId,status
               });
               const data=await connectionRequest.save();
                 res.json({
      message:req.user.firstName+" is "+status+" in "+toUser.firstName,
      data
    })

              
    } 
    catch(err)
    {
      res.status(400).send("ERROR: "+err.message);
    }
   
});
requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
     try{
            
      const loggedInUSer=req.user;
      const {status,requestId}=req.params;
      const allowedStatus=["accepted","rejected"];
      if(!allowedStatus.includes(status))
      {
        return res.status(400).json({
          message:"status not allowed!"
        })
      }
      const connectionRequest=await ConnectionRequest.findOne({
        _id:requestId,
        toUserId:loggedInUSer._id,
        status:"interested"
      });
      if(!connectionRequest)
      {
        return res.status(404).json({
          message:"Connection request not found",

        })
      }
      connectionRequest.status=status;
      connectionRequest.save();
      res.json({
        message:`connection request ${status}`
      })
      //loggedInUser==toUserId
      //in db in it interesed
      //status in allowed states:accepted,rejected
      //requestId should be valid

     }
     catch(err)
     {
      res.status(400).send("ERROR :"+err.message);
     }
});
module.exports=requestRouter;

