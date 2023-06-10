import mongoose from "mongoose"
const asyncHandler=require('express-async-handler')
import { Request,Response,RequestHandler } from "express"
import { ParamId, UpdateblogData, blogData, testinomialData } from "../utils/Interfaces"
import validateMongodbId from "../utils/mongodbIdValidator"
import TestinomialModel, { Testinomial } from "../models/testinomialmodel"

// create testinomial 
export const createTestinomial:RequestHandler<any,any,testinomialData,any>= asyncHandler(async(req:Request,res:Response)=>{
    try {
        const {name,description}=req.body
        if(!name || !description){
            throw new Error("all the fields are necessary")
        }else{
            let testinomial=await TestinomialModel.create({
                name,
                description,
                image:{
                    url:"String",
                    public_id:"String"
                }
            })
            res.status(200).json({
                sucess:false,
                testinomial
                
            })
        }
    } catch (error:any) {
        throw new Error(error)
        
    }
    
})


// get a single testinomial 
export const getASingleTestinomial:RequestHandler=asyncHandler(async(req:Request,res:any)=>{
       try {
        const id:ParamId=req.params.id
        validateMongodbId(id)  

        const testinomoial=await TestinomialModel.findById(id)
        if(!testinomoial){
            throw new Error("testinommial doesnt exists")
        }
        res.status(200).json({
            sucess:true,
            testinomoial
        })
        
    } catch (error:any) {
           throw new Error(error)
        
       }

})
export const updateTestinomial:RequestHandler=asyncHandler(async(req:Request,res:any)=>{
       try {
        const id:ParamId=req.params.id
        validateMongodbId(id)  
        const checkTest=await TestinomialModel.findById(id)
        if(!checkTest){
            throw new Error("testinomial not found")
        }
        const updatedTestinomial=await TestinomialModel.findByIdAndUpdate(id,req.body,{new:true})
        if(!updatedTestinomial){
            throw new Error("testinommial doesnt exists")
        }
        res.status(200).json({
            sucess:true,
            updatedTestinomial
        })
        
    } catch (error:any) {
        
        throw new Error(error)
       }

})
export const getAllTestinomial:RequestHandler=asyncHandler(async(req:Request,res:Response)=>{
    try {
        const testinomials=await TestinomialModel.find({})
        if(!testinomials){
            throw new Error("no testinomials")
        }
        res.status(200).json({
            sucess:true,
            testinomials
        })
        
    } catch (error:any) {
        throw new Error(error)
        
    }
})
export const deleteTestinomial:RequestHandler=asyncHandler(async(req:Request,res:any)=>{
       try {
        const id:ParamId=req.params.id
        validateMongodbId(id)  
        const checkTest=await TestinomialModel.findById(id)
        if(!checkTest){
            throw new Error("testinomial not found")
        }
        const testinomoial=await TestinomialModel.findByIdAndDelete(id)
        if(!testinomoial){
            throw new Error("testinommial doesnt exists")
        }
        res.status(200).json({
            sucess:true,
            message:"deleted sucessfully"
        })

       } catch (error:any) {
        throw new Error(error)
        
       }

})










