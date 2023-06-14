import asyncHandler from 'express-async-handler'
import { Request,Response,NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import UserModel from '../models/usermodel'
import validateMongodbId from '../utils/mongodbIdValidator'
import { CustomRequest } from '../interfaces/user.interfaces'

export const checkAuth=asyncHandler(async(req:CustomRequest,res:Response,next:NextFunction)=>{
    try {
        let checktoken=req.headers.authorization.startsWith('Bearer')
        if(!checktoken){
            throw new Error("register first")
        }
        let token=req.headers.authorization.split(' ')[1]
        let decoded:any=jwt.verify(token,process.env.SECRET)
        const id:string=decoded.id
        validateMongodbId(id)
        const user=await UserModel.findById(id)
        req.user=user
        next()   
    } catch (error:any) {
        throw new Error(error)        
    }
})