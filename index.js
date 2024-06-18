const express=require("express")

const app=express()

const {route}=require('./routes/auth_route')
app.use(express.json())
app.use("/auth",route);

app.listen(3000,()=>{
    console.log("server listening");
})