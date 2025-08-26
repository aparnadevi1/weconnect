const express=require('express');
const app=express();
const connectDB=require("./config/database");
const User=require("./models/user");
app.use(express.json());
app.post("/signup",async(req,res)=>{
  const user=new User(req.body);
  try{
    console.log(req.body);
    await user.save();
    res.send("Data addedd successfully");
  }
  catch(err)
  {
    res.status(400).send("Error saving the data"+err.message);
  }
});
app.get("/user",async(req,res)=>{
    const userEmail=req.body.emailId;
    try{
    const user=await User.findOne(({emailId:userEmail}));
    if(user.length===0)
    {
        res.status(404).send("User not found")
    }
    else{
      res.send(user);
    }
    
    }
    catch(err)
    {
         res.status(400).send("Error getting the data"+err.message);
    }
    
});
app.get("/feed",async(req,res)=>{
 try{
    const users=await User.find({});
    if(users.length===0)
    {
        res.status(404).send("User not found")
    }
    else{
      res.send(users);
    }
    
    }
    catch(err)
    {
         res.status(400).send("Error getting the data"+err.message);
    }
})
app.patch("/user",async(req,res)=>
{
    const userId=req.body.userId;
    const data=req.body;
    try{
       const user=await User.findByIdAndUpdate({_id:userId},data,{returnDocument:"after",runValidators:true});
       res.send({message:"user updated successfully",user});

    }
    catch{
       res.status(400).send("Error updating the data"+err.message);
    }

});
app.delete("/user",async(req,res)=>{
    
   const userId=req.body.userId;
   try{
       const deleteduser=await User.findByIdAndDelete(userId);
       res.send({message:"user deleted successfully",deleteduser});
   }
   catch(err)
   {
    res.status(400).send("Error deleting the user"+err.message);
    }
   
})



connectDB()
.then(()=>{
    console.log("Database connection established...");
    app.listen(3000,()=>{
    console.log("Server is successfully listening on  PORT 3000");
});

}).catch((err)=>{
    console.error("Database cannot be connected!!");
});

