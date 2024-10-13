import express from "express"
import { registerUser,loginUser,getUser,getallUsers } from "../Controller/userController.js";
const router=express.Router();

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/getUser/:username",getUser)
router.get("/getallUsers",getallUsers)

export default router