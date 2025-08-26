const express=require('express');
const app=express();
const connectDB=require("./config/database");
const User=require("./models/user");
const {validateSignUpData}=require("./utils/validation");
const bcrypt=require("bcrypt");

app.use(express.json());


app.post("/login",async(req,res)=>{
    try{
        
       const {emailId,password}=req.body;
       const user=await User.findOne({emailId:emailId});
       if(!user)
       {
        throw new Error("EmailID is not present in DB");
       }
       const isPasswordValid=await bcrypt.compare(password,user.password);
       if(isPasswordValid)
       {
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
app.post("/signup",async(req,res)=>{

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
app.patch("/user/:userId",async(req,res)=>
{
    const userId=req.params?.userId;
    const data=req.body;
   
    try{
         const ALLOWED_UPDATES=[
        "firstName","lastName","photoUrl","about","gender","age","skills"
        ];
        const isUpdateAllowed=Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));
        if(!isUpdateAllowed)
        {
            throw new EventSourcerror("Update not allowed");
        }
        if(data?.skills.length>10)
        {
            throw new Error("Skills cannot be more than 10");
        }
       const user=await User.findByIdAndUpdate({_id:userId},data,{returnDocument:"after",runValidators:true});
       res.send({message:"user updated successfully",user});

    }
    catch(err){
       res.status(400).send({error:"Error updating the data",details:err.message});
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

