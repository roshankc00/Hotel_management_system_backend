import mongoose from "mongoose"
const asyncHandler=require('express-async-handler')
import { Request,Response,RequestHandler } from "express"
import { AllBlog, ParamId, UpdateblogData, blogData, getBlog, resMe } from "../utils/Interfaces"
import BlogModel, { Blog, Blogs } from "../models/blogmodel"
import validateMongodbId from "../utils/mongodbIdValidator"

export const createBlog:RequestHandler<any,any,blogData,any>= asyncHandler(async(req:Request<any,any,blogData>,res:Response<resMe>)=>{
    try {
        const {title,description,tag}=req.body
        if(!title || !description || !tag){
            throw new Error("all the fields are necessary")
        }else{
            let blog=await BlogModel.create({
                title,
                description,
                tag,
                image:{
                    url:"String",
                    public_id:"String"
                }
                // this
            })
         res.status(200).json({
            sucess:false,
            message:"blog has been created"

         })
        }
    } catch (error:any) {
        throw new Error(error)
        
    }

})








// get a single blog
export const getSingleBlog:RequestHandler=asyncHandler(async(req:Request<ParamId>,res:Response<getBlog>)=>{
    try {
        const {id}=req.params
        validateMongodbId(id)

        let blog=await BlogModel.findById(id)
        if(!blog){
            throw new Error('blog not found')
        }
        res.status(200).json({
            sucess:true,
            blog
        })
        
    } catch (error:any) {
        throw new Error(error)
        
    }
})





// get all the blogs
export const getAllBlog:RequestHandler=asyncHandler(async(req:Request,res:Response)=>{
    try {
        

        let blogs=await BlogModel.find<Blogs>({}).exec()
        if(!blogs){
            throw new Error('blog not found')
        }
        res.status(200).json({
            sucess:true,
            blogs
        })
    } catch (error:any) {
        throw new Error(error)
        
    }
})
// delete blog 
export const deleteBlog:RequestHandler=asyncHandler(async(req:Request<ParamId>,res:Response<resMe>)=>{
    try {
        const id=req.params.id
        validateMongodbId(id)
        const blog=await BlogModel.findById(id).exec()
        if(!blog){
            throw new Error("blog not found")
        }    
        await BlogModel.findByIdAndDelete(id)
        res.status(200).json({
            sucess:true,
            message:"blog deleted sucessfully"
            })
    } catch (error:any) {
        throw new Error(error)
        
    }
})
export const updateBlog:RequestHandler=asyncHandler(async(req:Request<ParamId,any,UpdateblogData>,res:Response)=>{
    try {
        const id=req.params.id
        validateMongodbId(id)
       let blog=await BlogModel.findById(id)
        if(!blog){
            throw new Error('blog not found')
        }
        let updatedBlog=await BlogModel.findByIdAndUpdate<Blog>(id,req.body,{new:true})
        res.status(200).json({
            sucess:true,
            updatedBlog
        })
    } catch (error:any) {
        throw new Error(error)
    }
})