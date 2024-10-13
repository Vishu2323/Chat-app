import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import "dotenv/config"
import router from "./Routes/userRoutes.js"


 const app= express();
 const PORT=8000;

 app.use(express.json())
 app.use(cors())
app.use("/api/users",router)
 mongoose.connect(`${process.env.DB_URL}/${PORT}`)
.then(()=>console.log("Connection hogya"))
.catch((error)=>console.log("DB not connected",error.message))



 app.listen(PORT,(req,res)=>{
    console.log(`App is working on port:${PORT}`)
    
 })