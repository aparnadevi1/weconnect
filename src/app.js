const express=require('express');
const app=express();



app.use("/",(err,req,res,next)=>{
    if(err)
    {
        res.status(500).send("sone error");
    }
});
app.get("/getAllUsers",(req,res)=>{
    res.send("user data sent")
    //try{
           //throw new Error("dfdegfh");
    //}
    // catch(err)
    // {
    //   res.status(500).send("sone error");
    // }
})
// const adminAuth=require("./middlewares/auth");
// app.use("/admin",adminAuth);
// app.get("/admin/user",
//     (req,res)=>{
//     console.log("Handling route 1 ");
//       res.send("Response 1")
//     }

// );

// app.get("/user/:userId/:name/:password",(req,res)=>{
//     console.log(req.params)
//     res.send({
//         firstName:"Akshay",
//         lastName:"Saini"
//     })
// });
// app.post("/user",(req,res)=>{
//     res.send("Data successfully saved to the database!");
// });


// app.delete("/user",(req,res)=>{
//     res.send("Deleted successfully");
// });
// app.use("/test",(req,res)=>{
//     res.send("Hello from test server");
// })
// app.use((req,res)=>{
//     res.send("Hello from the server!");
// })
app.listen(3000,()=>{
    console.log("Server is successfully listening on  PORT 3000");
});
