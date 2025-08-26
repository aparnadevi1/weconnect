const express=require('express');
const app=express();
const connectDB=require("./config/database");
const User=require("./models/user");
app.post("/signup",async(req,res)=>{
    const userObj={
        firstName:"mourya",
        lastName:"ganta",
        email:"aparna@gmail.com",
        password:"Chinni21269"
    }
    //creating a new instance of the user model
    const user=new User(userObj);
    await user.save();
    res.send("user added succesfully")

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

