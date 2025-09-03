const userAuth = require("../middlewares/auth");
const User = require('../models/user');

const express=require("express");
const userRouter=express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const USER_SAFE_DATA="firstName lastName photoURL about skills age gender";
userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
    try{
       const loggedInUser=req.user;
       const connectionRequests=await ConnectionRequest.find({
        toUserId:loggedInUser._id,
        status:"interested"
       }).populate("fromUserId",USER_SAFE_DATA);
      
      res.json({
        message:"Requests data fetched successfully",
        data:connectionRequests,
      })
    }
     catch(err)
     {
      res.status(400).send("ERROR :"+err.message);
     }


});


userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequests=await ConnectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id,status:"accepted"},
                {fromUserId:loggedInUser._id,status:"accepted"}
            ]
        }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA);
        const data=connectionRequests.map(
            (row)=>{
            if(row.fromUserId._id.toString()===loggedInUser._id.toString())
            {
                return row.toUserId
            }
            return row.fromUserId;
             });

        res.json({
            message:"connections fetched successfully",
            data
    
    })

    
}
    catch(err)
     {
      res.status(400).send("ERROR :"+err.message);
     }

});

userRouter.get("/user/feed",userAuth,async(req,res)=>{
    try{
           //user should see all the user cards except
           //0.his Own card
           //1.his connections
           //2.ignored people
           //3.already send the connection request
           const loggedInUser=req.user;
           const page=parseInt(req.query.page)||1;
           let limit=parseInt(req.query.limit)||10;
          limit=limit>50?50:limit;
           const skip=(page-1)*limit;
           //find all connection request(sent+received)
           const connectionRequest = await ConnectionRequest.find({
            $or:[{fromUserId:loggedInUser._id },{toUserId:loggedInUser._id}]})
           .select("fromUserId toUserId").populate("fromUserId",["firstName"]).populate("toUserId",["firstName"]);
           const hideUsersFromFeed=new Set();
           connectionRequest.forEach(req=>{
            hideUsersFromFeed.add(req.fromUserId._id.toString());
            hideUsersFromFeed.add(req.toUserId._id.toString());
             });
             const users=await User.find({
                $and:[{ _id:{$nin:Array.from(hideUsersFromFeed)}},
                       { _id:{$ne:loggedInUser._id}}],
             }).select(USER_SAFE_DATA).skip(skip).limit(limit);
           res.send({data:users});
    }
    catch(err)
    {
         res.status(400).send("ERROR :"+err.message);
    }
})



module.exports=userRouter;