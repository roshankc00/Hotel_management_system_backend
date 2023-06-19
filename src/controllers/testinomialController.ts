import mongoose from "mongoose"
const asyncHandler=require('express-async-handler')
import { Request,Response,RequestHandler } from "express"
import { ParamId,  changeTestinomialImageRes,  createTestinomialresInterface,  deleteTestinomialresInterface,  resMe, testinomialData, testinomialUpdateData, testinomialgetAllData, testinomialgetData, updatedTestinomialresInterface, validateCreateTestinomial, validateUpdateTestinomial } from "../interfaces/testinomial.interfaces"
import validateMongodbId from "../utils/mongodbIdValidator"
import TestinomialModel, { Testinomial } from "../models/testinomialmodel"
import cloudinary from '../config/CloudinaryConfig';


// create testinomial 
export const createTestinomial:RequestHandler= asyncHandler(async(req:Request<any,any,testinomialData>,res:Response<createTestinomialresInterface>)=>{
    try {
        const {name,description}=req.body
        let  result=validateCreateTestinomial.safeParse(req.body)
        let wow:any=JSON.stringify(result,null,2)
         wow=JSON.parse(wow)
        if(!wow.success){
            res.status(400).json({
                error:wow
            })
            return 
        }else{
            const cloud:any = await cloudinary.v2.uploader.upload(req.file.path)
            let testinomial=await TestinomialModel.create({
                name,
                description,
                image:{
                    url:cloud.secure_url,
                    public_id:cloud.public_id,
                }
            })
            res.status(200).json({
                sucess:false,
                message:"testinomial created",
                testinomial
                
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
export const updateTestinomial:RequestHandler=asyncHandler(async(req:Request<ParamId,any,testinomialUpdateData>,res:Response<updatedTestinomialresInterface>)=>{
       try {
        const id=req.params.id
        validateMongodbId(id)  
        let  result=validateUpdateTestinomial.safeParse(req.body)
        let wow:any=JSON.stringify(result,null,2)
         wow=JSON.parse(wow)
        if(!wow.success){
            res.status(400).json({
                error:wow
            })
            return 
        }
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
            message:"testinomial updated sucessfully",
            updatedTestinomial
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
export const deleteTestinomial:RequestHandler=asyncHandler(async(req:Request<ParamId>,res:Response<deleteTestinomialresInterface>)=>{
       try {
        const id=req.params.id
        validateMongodbId(id)  
        const checkTest=await TestinomialModel.findById(id)
        if(!checkTest){
            throw new Error("testinomial not found")
        }
        const deleteImage=await cloudinary.v2.uploader.destroy(checkTest.image.public_id)
        const testinomoial=await TestinomialModel.findByIdAndDelete(id)
        res.status(200).json({
            sucess:true,
            message:"deleted sucessfully",
            
        })
       } catch (error:any) {
        throw new Error(error)
        
       }

})






export const changeTheUserImage=asyncHandler(async(req:Request,res:Response<changeTestinomialImageRes>)=>{
    try {
        validateMongodbId(req.params.id)
        const testinomial=await TestinomialModel.findById(req.params.id)
        const destroy=await cloudinary.v2.uploader.destroy(testinomial.image.public_id)
        const cloud:any = await cloudinary.v2.uploader.upload(req.file.path)
        let updatedTes=await TestinomialModel.findByIdAndUpdate(req.params.id,{  image:{
            url:cloud.secure_url,
            public_id:cloud.public_id,
        }},{new:true})
        console.log(updatedTes)
       return  res.status(200).json({
            status:true,
            message:"testinomial image changed sucessfully",
            updatedTes
        })
                      
    } catch (error:any) {
        throw new Error(error.message)
        
    }

})

