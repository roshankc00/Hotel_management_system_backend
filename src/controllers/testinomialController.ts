import mongoose from "mongoose"
const asyncHandler=require('express-async-handler')
import { Request,Response,RequestHandler } from "express"
import { ParamId,  resMe, testinomialData, testinomialUpdateData, testinomialgetAllData, testinomialgetData } from "../interfaces/testinomial.interfaces"
import validateMongodbId from "../utils/mongodbIdValidator"
import TestinomialModel, { Testinomial } from "../models/testinomialmodel"


// create testinomial 
export const createTestinomial:RequestHandler= asyncHandler(async(req:Request<any,any,testinomialData>,res:Response<resMe>)=>{
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
                message:"testinomial created"
                
            })
        }
    } catch (error:any) {
        throw new Error(error)
        
    }
    
})

  
// get a single testinomial 
export const getASingleTestinomial:RequestHandler=asyncHandler(async(req:Request<ParamId>,res:Response<testinomialgetData>)=>{
       try {
        const {id}=req.params
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
// update the testinomial
export const updateTestinomial:RequestHandler=asyncHandler(async(req:Request<ParamId,any,testinomialUpdateData>,res:Response<resMe>)=>{
       try {
        const id=req.params.id
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
            message:"testinomial updated sucessfully"
        })
        
    } catch (error:any) {
        
        throw new Error(error)
       }

})

// get all the testinomials
export const getAllTestinomial:RequestHandler=asyncHandler(async(req:Request,res:Response<testinomialgetAllData>)=>{
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

// delete the testinomial

export const deleteTestinomial:RequestHandler=asyncHandler(async(req:Request<ParamId>,res:Response<resMe>)=>{
       try {
        const id=req.params.id
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










