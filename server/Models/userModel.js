import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name: String,
    email:{
        type:String,
        unique:true
    },
    password:String
},{
    timestamps:true
})

export const userModel = mongoose.model("userModel",userSchema)