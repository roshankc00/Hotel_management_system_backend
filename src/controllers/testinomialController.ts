import mongoose from "mongoose"
const asyncHandler=require('express-async-handler')
import { Request,Response,RequestHandler } from "express"
import { ParamId,  resMe, testinomialData, testinomialUpdateData, testinomialgetAllData, testinomialgetData, validateCreateTestinomial, validateUpdateTestinomial } from "../interfaces/testinomial.interfaces"
import validateMongodbId from "../utils/mongodbIdValidator"
import TestinomialModel, { Testinomial } from "../models/testinomialmodel"
import cloudinary from 'cloudinary';


// create testinomial 
export const createTestinomial:RequestHandler= asyncHandler(async(req:Request<any,any,testinomialData>,res:Response)=>{
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
            const cloud:any = cloudinary.v2.uploader.upload(req.file.path)
            cloud.then(async(data:any) => {  
                console.log(data)
                console.log(data.secure_url)     
            let testinomial=await TestinomialModel.create({
                name,
                description,
                image:{
                    url:data.secure_url,
                    public_id:data.public_id,
                }
            })
            res.status(200).json({
                sucess:false,
                message:"testinomial created",
                testinomial
            })
        }).catch((err:any)=>{
            console.log(err)
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
export const updateTestinomial:RequestHandler=asyncHandler(async(req:Request<ParamId,any,testinomialUpdateData>,res:Response)=>{
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
export const deleteTestinomial:RequestHandler=asyncHandler(async(req:Request<ParamId>,res:Response)=>{
       try {
        const id=req.params.id
        validateMongodbId(id)  
        const checkTest=await TestinomialModel.findById(id)
        if(!checkTest){
            throw new Error("testinomial not found")
        }
        const deleteImage=cloudinary.v2.uploader.destroy(checkTest.image.public_id).then(async()=>{

            const testinomoial=await TestinomialModel.findByIdAndDelete(id)
            if(!testinomoial){
                throw new Error("testinommial doesnt exists")
            }
            res.status(200).json({
                sucess:true,
                message:"deleted sucessfully",
                testinomoial
                
            })
        }).catch((err)=>{
            throw new Error(err)
        })
      

       } catch (error:any) {
        throw new Error(error)
        
       }

})






export const changeTheUserImage=asyncHandler(async(req:Request,res:Response)=>{
    try {
        validateMongodbId(req.params.id)
        const testinomial=await TestinomialModel.findById(req.params.id)
        const destroy=await cloudinary.v2.uploader.destroy(testinomial.image.public_id).then(()=>{
            const cloud:any = cloudinary.v2.uploader.upload(req.file.path)
            cloud.then(async(data:any)=>{
                let updatedTes=await TestinomialModel.findByIdAndUpdate(req.params.id,{  image:{
                    url:data.secure_url,
                    public_id:data.public_id,
                }},{new:true})
                console.log(updatedTes)
               return  res.status(200).json({
                    status:true,
                    message:"blog created sucessfully"
                })
            }).catch((err:any)=>{console.log(err)})
    

        }).catch((err)=>{
            console.log(err)
        })
    } catch (error:any) {
        throw new Error(error.message)
        
    }

})

