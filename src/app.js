const express=require('express');
const app=express();
app.get("/user",(req,res)=>{
    res.send({
        firstName:"Akshay",
        lastName:"Saini"
    })
});
app.post("/user",(req,res)=>{
    res.send("Data successfully saved to the database!");
});


app.delete("/user",(req,res)=>{
    res.send("Deleted successfully");
});
// app.use("/test",(req,res)=>{
//     res.send("Hello from test server");
// })
// app.use((req,res)=>{
//     res.send("Hello from the server!");
// })
app.listen(3000,()=>{
    console.log("Server is successfully listening on  PORT 3000");
});
