import asyncHandler from "express-async-handler"
import { Request,Response,RequestHandler } from "express"
import UserModel from "../models/usermodel"
import jwt from 'jsonwebtoken'
import env from '../utils/validateEnv'
import { tokendata, createUser, userres, loginuser, createLoginValid, CustomRequest ,createUserValid, forgetPasswordValid, resetPasswordValid, updatePasswordValid, resSinglerUser, resAllUser, resForgetPassword, resResetPassword, resupdatetPassword} from '../interfaces/user.interfaces';
import validateMongodbId from "../utils/mongodbIdValidator"
import crypto from 'crypto';
import sendEmail from "../utils/sendEmail"
import { resMe } from "../interfaces/testinomial.interfaces"

// register the user 
export const registerUser:RequestHandler=asyncHandler(async(req:Request<any,any,createUser>,res:Response<userres>)=>{
    try {
        const {email,password,name}=req.body
        // validating the req.body type 
        let  result=createUserValid.safeParse(req.body)
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
           const data={
            email:user.email
           }
           const token=jwt.sign(data,env.SECRET)
         
           res.status(200).json({
            sucess:true,
            token,
            message:"User created Sucessfully"
           })
        }
       

        
    } catch (error:any) {
        throw new Error(error) 
    }
})






// login the user 

export const loginUser=asyncHandler(async(req:Request<any,any,loginuser>,res:Response)=>{
    try {
        const {email,password}=req.body
        // validating the incomming req.body type 
        let  result=createLoginValid.safeParse(req.body)
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

        const data={
            email:existUser.email
           }
           const token=jwt.sign(data,env.SECRET)
         
           res.status(200).json({
            sucess:true,
            data:{
                token,
                role:existUser.role
            },
            message:"user loged in sucessfully"
           })

    } catch (error:any) {
        throw new Error(error)
    }
})





// get a single user 
export const getASingleUser=asyncHandler(async(req:Request,res:Response<resSinglerUser>)=>{
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

export const getAllUsers=asyncHandler(async(req:Request,res:Response<resAllUser>)=>{
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

export const updateRole=asyncHandler(async(req:Request,res:Response<resMe>)=>{
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
        res.status(200).json({
            sucess:true,
            message:"role updated sucessfully"
        })
    } catch (error:any) {
        throw new Error(error)
        
    }
})



// delete the user 
export const deleteUser=asyncHandler(async(req:CustomRequest,res:Response<resMe>)=>{
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
export const forgetPassword=asyncHandler(async(req:Request,res:Response<resForgetPassword>)=>{
    try {
        const {email}=req.body
             // validating the req.body type 
        let  result=forgetPasswordValid.safeParse(req.body)
        let wow:any=JSON.stringify(result,null,2)
         wow=JSON.parse(wow)
        if(!wow.success){
            res.status(400).json({
                error:wow
            })
            return 

        }else{
            const user=await UserModel.findOne({email})
            if(!user){
                throw new Error("user doesnt exists")
            }
           let token =await  user.generateToken()
           await user.save()
           const resetUrl=`${req.protocol}://${req.get("host")}/api/v1/user/password/reset/${token}`
            const message=`Reset Your password on clicking:\n ${resetUrl}`
            const subject:string="Reset your password"
            try {
                console.log("me")
               await  sendEmail({email,message,subject})
               res.status(200).json({
                sucess:true,
                message:"mail sent sucessfully"
               })
            } catch (error) {
                user.resetPasswordToken=undefined
                user.resetDateExpire=undefined
                await user.save()
            }

        }


       
    } catch (error:any) {
        throw new Error(error)
        
    }
})



// reset password 
export const resetPassword=asyncHandler(async(req:Request,res:Response<resResetPassword>)=>{
    try {
        const {newPassword,confirmPassword}=req.body
                 // validating the req.body type 
                 let  result=resetPasswordValid.safeParse(req.body)
                 let wow:any=JSON.stringify(result,null,2)
                  wow=JSON.parse(wow)
                 if(!wow.success){
                     res.status(400).json({
                         error:wow
                     })
                     return 
                    //  validation ends here 
                 }else{
                    if(newPassword!==confirmPassword){
                        throw new Error('the password doesnt match')
                    }
                    const token=req.params.token
                    const resetPasswordToken=crypto
                    .createHash("sha256")
                    .update(token)
                    .digest("hex");
                    const user=await UserModel.findOne({
                        resetPasswordToken,
                        resetDateExpire: { $gt: Date.now() }
                         })
                    console.log(user)
                    if(user){
                        user.password=newPassword
                        user.resetPasswordToken=undefined
                        user.resetDateExpire=undefined
                        await user.save()
                        res.status(200).json({
                            sucess:true,
                            message:"password has been changed sucessfully"
                        })
                    }else{
                        throw new Error("the token is expired or the token is not valid")
                    }
                 }
    } catch (error:any) {
        throw new Error(error)
        
    }
})


// UPDATE the password 
export const updatePassword=asyncHandler(async(req:Request,res:Response<resupdatetPassword>)=>{
    try {
        const {email,newPassword,oldPassword}=req.body
             // validating the req.body type 
             let  result=updatePasswordValid.safeParse(req.body)
             let wow:any=JSON.stringify(result,null,2)
              wow=JSON.parse(wow)
             if(!wow.success){
                 res.status(400).json({
                     error:wow
                 })
                 return 
                //  validation ends here 
             }
        const user=await UserModel.findOne({email})
        if(!user){
            throw new Error("user email doesnt match")
        }
       let  isTrue=await user.comparePassword(oldPassword)
       if(isTrue){
        user.password=newPassword
        await user.save()
        res.status(200).json({
            sucess:true,
            message:"password updated sucssfully"
        })
       }else{
        res.status(200).json({
            sucess:true,
            message:"enter the valid password"
        })
       }
        
    } catch (error:any) {
        throw new Error(error)
        
    }

})






