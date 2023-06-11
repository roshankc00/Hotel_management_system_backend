import asyncHandler from "express-async-handler"
import { Request,Response,RequestHandler } from "express"

const registerUser:RequestHandler=asyncHandler(async(req:Request,res:Response)=>{
    try {
        const {email,password,name}=req.body
        const existingUser=UserModel
        
    } catch (error) {
        
    }


})