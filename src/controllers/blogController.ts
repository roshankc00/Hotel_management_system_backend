import mongoose from "mongoose"
const asyncHandler=require('express-async-handler')
import { Request,Response,RequestHandler } from "express"
import { UpdateblogData, blogData } from "../utils/Interfaces"
import BlogModel, { Blog, Blogs } from "../models/blogmodel"
import validateMongodbId from "../utils/mongodbIdValidator"

export const createBlog:RequestHandler<any,any,blogData,any>= asyncHandler(async(req:Request,res:Response)=>{
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
            })
         res.status(200).json({
            sucess:false,
            blog

         })
        }
    } catch (error:any) {
        throw new Error(error)
        
    }

})













// get a single blog
export const getSingleBlog:RequestHandler=asyncHandler(async(req:Request,res:Response)=>{
    try {
        const id=req.params.id
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
export const deleteBlog:RequestHandler=asyncHandler(async(req:Request,res:Response)=>{
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
export const updateBlog:RequestHandler<any,any,UpdateblogData,any>=asyncHandler(async(req:Request,res:Response)=>{
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