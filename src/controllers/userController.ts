import asyncHandler from "express-async-handler"
import { Request,Response,RequestHandler } from "express"
import UserModel from "../models/usermodel"
import jwt from 'jsonwebtoken'
import env from '../utils/validateEnv'
import { tokendata, createUser, userres, loginuser, createLoginSchema, CustomRequest } from '../interfaces/user.interfaces';
import { createUserSchema } from "../interfaces/user.interfaces"
import validateMongodbId from "../utils/mongodbIdValidator"

// register the user 
export const registerUser:RequestHandler=asyncHandler(async(req:Request<any,any,createUser>,res:Response<userres>)=>{
    try {
        const {email,password,name}=req.body
        // validating the req.body type 
        let  result=createUserSchema.safeParse(req.body)
        let wow:any=JSON.stringify(result,null,2)
         wow=JSON.parse(wow)
        if(!wow.success){
            res.status(400).json({
                error:wow
            })
            return 

        }else{
            const existingUser=await UserModel.findOne({email})
            if(existingUser){
                throw new Error("user already exists")
            }
           let  user=await UserModel.create({
            email,
            password,
            name
           })
           const data:tokendata={
            id:user._id
           }
           const token=jwt.sign(data,env.SECRET)
         
           res.status(200).json({
            sucess:true,
            token
           })
        }
       

        
    } catch (error:any) {
        throw new Error(error) 
    }
})






// login the user 

export const loginUser=asyncHandler(async(req:Request<any,any,loginuser>,res:Response<userres>)=>{
    try {
        const {email,password}=req.body
        // validating the incomming req.body type 
        let  result=createLoginSchema.safeParse(req.body)
        let wow:any=JSON.stringify(result,null,2)
         wow=JSON.parse(wow)
        if(!wow.success){
            res.status(400).json({
                error:wow
            })
            return 
        }
        const existUser=await UserModel.findOne({email})



        if(!existUser){
            throw new Error("register first")
        }
        const isTrue=await existUser.comparePassword(password)
        if(!isTrue){
            throw new Error("enter the valid password")
        }

        const data:tokendata={
            id:existUser._id
           }
           const token=jwt.sign(data,env.SECRET)
         
           res.status(200).json({
            sucess:true,
            token
           })

    } catch (error:any) {
        throw new Error(error)
    }
})





// get a single user 
export const getASingleUser=asyncHandler(async(req:Request,res:Response)=>{
    try {
        validateMongodbId(req.params.id);
        const user=await UserModel.findById(req.params.id)
        if(!user){
            throw new Error("user doesnt exists")
        }else{
            res.status(200).json({
                sucess:true,
                user
            })
        }

        
    } catch (error:any) {
        throw new Error(error)
        
    }
})





// get all the user 

export const getAllUsers=asyncHandler(async(req:Request,res:Response)=>{
    try {
        const users=await UserModel.find({})
        res.status(200).json({
            sucess:true,
            users
        })
    } catch (error:any) {
        throw new Error(error)
        
    }

})


// update the user role

export const updateRole=asyncHandler(async(req:Request,res:Response)=>{
    try {
        validateMongodbId(req.params.id)
        if(req.body.role!=="user" || req.body.role!=="admin"){
            throw new Error('invalid role')
        }
        const user=await UserModel.findById(req.params.id)
        if(!user){
            throw new Error("user doesnt exists")
        }
        user.role=req.body.role
        await user.save()
    } catch (error:any) {
        throw new Error(error)
        
    }
})



// delete the user 
export const deleteUser=asyncHandler(async(req:CustomRequest,res)=>{
    try {
        const id:string=req.user.id
        const deleteUser=await UserModel.findByIdAndDelete(req.user._id)
        res.status(200).json({
            sucess:true,
            message:"user has been deleted sucessfully"
        })
    } catch (error:any) {
        throw new Error(error)
        
    }

})

// forgetPassword
export const forgetPassword=asyncHandler(async(req,res)=>{
    try {
        const {email}=req.body
        const user=await UserModel.findOne({email})
       let token =await  user.generateToken()
       console.log(token)
       const resetUrl=`${req.protocol}://${req.get("host")}/api/v1/user/password/reset/${token}`
        const message=`Reset Your password on clicking:\n ${resetUrl} `
        res.send(message)
        
    } catch (error:any) {
        throw new Error(error)
        
    }
})



