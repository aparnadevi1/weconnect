const mongoose=require("mongoose");
const validator=require("validator");
const userSchema=new mongoose.Schema({
       firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50
       },
       lastName:{
        type:String
       },
       emailId:{
        type:String,
        lowercase:true,
        trim:true,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error("Invalid email address"+value);
            }
       }},
       password:{
        type:String,
        required:true,
       },
       age:{
        type: Number,
        min:18,
        
       },
       gender:{
        type:String,
        validate(value){
            if(!["male","female", "others"].includes(value))
            {
                throw new Error("Gender data is not valid");
            }
        },
       },
       photoUrl:{
        type:String,
        default:"https://www.pinclipart.com/picdir/middle/541-5416602_chin-clipart.png",
          validate(value){
            if(!validator.isURL(value))
            {
                throw new Error("Invalid Photo Url"+value);
            }
       }},
       
       about:{
        type:String,
        default:"This is a default about of the user!"
       },
       skills:{
        type:[String],
       }

},{timestamps:true});
const User=mongoose.model("User",userSchema);
module.exports=User;
