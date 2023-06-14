import asyncHandler=require('express-async-handler')
import { Request,Response,RequestHandler } from 'express'
import { ParamId, achievement, allstaf, getStaf, param, promote, resMe, stafData } from '../utils/Interfaces'
import StafModel from '../models/stafmodel'
import validateMongodbId from '../utils/mongodbIdValidator'

export const createStaf:RequestHandler=asyncHandler(async(req:Request<any,any,stafData,any>,res:Response<resMe>)=>{
    try {
        const {name,address,position,salary,email,phoneNumber}=req.body
        if(!name || !address || !position || !salary || !email ||!phoneNumber){
            throw new Error("all the fields are necesssary")
        }
         const chectStaf=await StafModel.findOne({email})
         if (chectStaf){
            throw new Error("this user already exists")
         }

            const staf=await StafModel.create({
                name,
                email,
                position,
                salary,
                phoneNumber,
                address,
            })
            res.status(200).json({
                sucess:true,
                message:"user created sucessfully"
            })
        
        
    } catch (error:any) {
        throw new Error(error)
        
    }
})

// get a single staf 

export const getSingleStaf:RequestHandler=asyncHandler(async(req:Request,res:Response<getStaf>)=>{
    try {
        const {id}=req.params
        validateMongodbId(id);
        const staf=await StafModel.findById(id)
        if(!staf){
            throw new Error("user not found")
        }
        res.status(200).json({
            sucess:true,
            staf
        })
        
    } catch (error:any) {
        throw new Error(error)
        
    }
})
export const getAllStaf:RequestHandler=asyncHandler(async(req:Request,res:Response<allstaf>)=>{
    try {
        const stafs=await StafModel.find({})
        res.status(200).json({
            sucess:true,
            stafs
        })
        
    } catch (error:any) {
        throw new Error(error)
        
    }
})
export const updateStaf:RequestHandler=asyncHandler(async(req:Request,res:Response)=>{
    try {
        const id:string=req.params.id
        validateMongodbId(id)
        const checkstaf=await StafModel.findById(id)
        if(!checkstaf){
            throw new Error("no staf exists")
        }
        const staf=await StafModel.findById(id,req.body,{new:true})
        res.status(200).json({
            staf

        })
    } catch (error:any) {
        throw new Error(error)
        
    }
})

// delete the staf 
export const deleteStaf:RequestHandler=asyncHandler(async(req:Request,res:Response<resMe>)=>{
    try {
        const id:string=req.params.id
        validateMongodbId(id)
       const staf= await StafModel.findByIdAndDelete(id)
        if(!staf){
            throw new Error("staf not found")
        }
        res.status(200).json({
            sucess:true,
            message:"staf deleted sucess fully"
        })
    } catch (error:any) {
        throw new Error(error)
        
    }
})


// add the staf achievement 
export const addAcheivementStaf:RequestHandler=asyncHandler(async(req:Request<any,any,achievement,any>,res:Response)=>{
    try {
        const achievement=req.body.achievement
        if(achievement.length<=5){
            throw new Error("enter the valid achievement")
        }
        const id:string =req.params.id
        validateMongodbId(id);
        const staf=await StafModel.findById(id)
  
        if(!staf){
            throw new Error("user not found")
        }
        console.log("wow")
        staf.acheiveaments.push(achievement)
        await staf.save()
        console.log(staf)
        res.status(200).json({
            sucess:true,
            staf
        })
    } catch (error:any) {
        throw new Error(error)
        
    }
})
// promote the staf 
export const promoteStaf:RequestHandler=asyncHandler(async(req:Request<any,any,promote>,res:Response<resMe>)=>{
    try {
        const position=req.body.position
        if(position.length<=3){
            throw new Error("enter the valid achievement")
        }
        const id:string =req.params.id
        validateMongodbId(id);
        const staf=await StafModel.findById(id)
        if(!staf){
            throw new Error("user not found")
        }
        staf.position=position
        await staf.save()
        res.status(200).json({
            sucess:true,
            message:"staf has been promoted"
        })
    } catch (error:any) {
        throw new Error(error)
        
    }
})


