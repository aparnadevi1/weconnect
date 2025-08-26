const mongoose=require("mongoose");
const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://chodapuneediaparnadevi:h5xdHu6nJ3BF9Ljc@weconnectcluster.dh5jk1y.mongodb.net/weconnect");
};
module.exports=connectDB;