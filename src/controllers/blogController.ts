import mongoose from "mongoose"
const asyncHandler=require('express-async-handler')
import { Request,Response,RequestHandler } from "express"
import { AllBlog, ParamId, UpdateblogData, blogData, getBlog, resMe } from '../interfaces/blog.interfaces';
import BlogModel, { Blog, Blogs } from "../models/blogmodel"
import validateMongodbId from "../utils/mongodbIdValidator"
import cloudinary from 'cloudinary';
import upload from '../middlewares/multer';



// create the blog 
export const createBlog:RequestHandler<any,any,blogData,any>= asyncHandler(async(req:Request<any,any,blogData>,res:Response)=>{
    try {
        const {title,description,tag}=req.body
        const cloud:any = cloudinary.v2.uploader.upload(req.file.path)
        cloud.then(async(data:any)=>{
            const blog=await BlogModel.create({
                tag,
                title,
                description,
                image:{
                    url:data.secure_url,
                    public_id:data.public_id,
                }
            })
            res.send(blog)
        })
         
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
        
        let  deleteImage=cloudinary.v2.uploader.destroy(blog.image.public_id)
        .then(async(data:any)=>{
          
       let vlog= await BlogModel.findByIdAndDelete(id)
        res.status(200).json({
            sucess:true,
            message:"blog deleted sucessfully",
            blog
            
            })
         
        }).catch((err)=>{
            throw new Error(err)
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



export const changeTheBlogImage=asyncHandler(async(req:Request,res:Response)=>{
    try {
        validateMongodbId(req.params.id)
        const blog=await BlogModel.findById(req.params.id)
        const destroy=await cloudinary.v2.uploader.destroy(blog.image.public_id).then(()=>{
            const cloud:any = cloudinary.v2.uploader.upload(req.file.path)
            cloud.then(async(data:any)=>{
                let updatedTes=await BlogModel.findByIdAndUpdate(req.params.id,{  image:{
                    url:data.secure_url,
                    public_id:data.public_id,
                }},{new:true})
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