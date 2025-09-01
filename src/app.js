const express=require('express');
const app=express();
const connectDB=require("./config/database");
const User=require("./models/user");
const {validateSignUpData}=require("./utils/validation");
const bcrypt=require("bcrypt");
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");
const userAuth=require("./middlewares/auth");
app.use(cookieParser());

app.use(express.json());


app.post("/login",async(req,res)=>{  
    try{
        
       const {emailId,password}=req.body;
       const user=await User.findOne({emailId:emailId});
       if(!user)
       {
        throw new Error("Invalid credentials");
       }
       const isPasswordValid=user.validatePassword;
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
app.get("/profile",userAuth,async(req,res)=>{
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


app.post("/sendConnectionRequest",userAuth,async(req,res)=>{
    const user=req.user;
  //  console.log("sending a connection request");
    res.send(user.firstName+" Sent the  Connection Request");
});






connectDB()
.then(()=>{
    console.log("Database connection established...");
    app.listen(3000,()=>{
    console.log("Server is successfully listening on  PORT 3000");
});

}).catch((err)=>{
    console.error("Database cannot be connected!!");
});

