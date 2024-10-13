import  {userModel }from "../Models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import validator from "validator"
import "dotenv/config"

const createjwt = (_id)=>{
     
    const secretkey= process.env.JWT_KEY
     return jwt.sign({_id},secretkey,{expiresIn:"1d"})
}
const registerUser = async (req,res)=>{
        try {
        // res.send("Register")
        const {name,email,password}=req.body
    
        let user= await userModel.findOne({email})
        if(user){
            return res.status(400).json("Email Already Exists!!")
        }
        if(!name || !email || !password){
            return res.status(400).json("All Fields are required")
        }
        if(!validator.isEmail(email)){
            return res.status(400).json("Invalid Email")
        }
        if(!validator.isStrongPassword(password)){
              return res.status(400).json("Password should be more strong")
        }
        user = new userModel({name,email,password})
        const salt= await bcrypt.genSalt(10)
        user.password= await bcrypt.hash(user.password,salt)
    
        await user.save();
        const token = createjwt(user._id)
        return res.status(200).json({_id: user._id,name,email,token})
    }catch (error) {
        console.log(error)
     res.status(500).json(error)
    }
}    

const loginUser= async(req,res)=>{
    const {email,password,name}=req.body
    try {
        const user= await userModel.findOne({email})
        if(!user)return res.status(400).json("User not registered")

        const isvalPass= await bcrypt.compare(password,user.password)
        if(!isvalPass)return res.status(400).json("Password is wrong")

        const token = createjwt(user._id)
        return res.status(200).json({_id: user._id,name,email,token})
    } catch (error){
        return res.status(500).json("Something Wrong in Logging in user",error)
    }
}

const getUser= async(req,res)=>{
    const username = req.params.userModel.name;
    try {
        const user = await userModel.findById(username)
        return res.status(200).json(user._id)

    } catch (error) {
        return res.status(500).json(error)
        
    }
}
const getallUsers= async (req,res)=>{
    try {
        const users=await userModel.find()
        return res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
}


export {registerUser,loginUser,getUser,getallUsers};