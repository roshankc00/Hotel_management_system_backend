import mongoose from "mongoose"
const asyncHandler=require('express-async-handler')
import { Request,Response,RequestHandler } from "express"
import { AllBlog, ParamId, UpdateblogData, blogData, getBlog, resMe, validateCreateBlog, validateUpdateBlog } from '../interfaces/blog.interfaces';
import BlogModel, { Blog, Blogs } from "../models/blogmodel"
import validateMongodbId from "../utils/mongodbIdValidator"
import cloudinary from 'cloudinary';



// create the blog 
export const createBlog:RequestHandler<any,any,blogData,any>= asyncHandler(async(req:Request<any,any,blogData>,res:Response)=>{
    try {
        const {title,description,tag}=req.body

            // validating the req.body type 
            let  result=validateCreateBlog.safeParse(req.body)
            let wow:any=JSON.stringify(result,null,2)
             wow=JSON.parse(wow)
            if(!wow.success){
                res.status(400).json({
                    error:wow
                })
                return 
            }
        //   uploading image to cloudinary
        const cloud:any = await cloudinary.v2.uploader.upload(req.file.path)
        const blog=await BlogModel.create({
            tag,
            title,
            description,
            image:{
                url:cloud.secure_url,
                public_id:cloud.public_id,
            }
        })
        res.send(blog)
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
export const deleteBlog:RequestHandler=asyncHandler(async(req:Request<ParamId>,res:Response)=>{
    try {
        const id=req.params.id
        validateMongodbId(id)
        const blog=await BlogModel.findById(id).exec()
        if(!blog){
            throw new Error("blog not found")
        }    
        console.log(blog)
        
        let  deleteImage=await cloudinary.v2.uploader.destroy(blog.image.public_id)
        let vlog= await BlogModel.findByIdAndDelete(id)
        res.status(200).json({
            sucess:true,
            message:"blog deleted sucessfully",         
            })
      
    } catch (error:any) {
        throw new Error(error)
        
    }
})




export const updateBlog:RequestHandler=asyncHandler(async(req:Request<ParamId,any,UpdateblogData>,res:Response)=>{
    try {
        const id=req.params.id
        validateMongodbId(id)
             // validating the req.body type 
             let  result=validateUpdateBlog.safeParse(req.body)
             let wow:any=JSON.stringify(result,null,2)
              wow=JSON.parse(wow)
             if(!wow.success){
                 res.status(400).json({
                     error:wow
                 })
                 return 
             }
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



export const changeTheBlogImage=asyncHandler(async(req:Request,res:Response)=>{
    try {
        validateMongodbId(req.params.id)
        const blog=await BlogModel.findById(req.params.id)
        const destroy=await cloudinary.v2.uploader.destroy(blog.image.public_id)
        const cloud:any = cloudinary.v2.uploader.upload(req.file.path)
            let updatedTes=await BlogModel.findByIdAndUpdate(req.params.id,{  image:{
                url:cloud.secure_url,
                public_id:cloud.public_id,
            }},{new:true})
           return  res.status(200).json({
                status:true,
                message:"blog created sucessfully",
                updatedTes
            })
            
    } catch (error:any) {
        throw new Error(error.message)
        
    }

})