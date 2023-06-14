import mongoose from "mongoose"
import { Blog, Blogs } from "../models/blogmodel"




export interface ParamId {
    id:any
 }
  
export interface resMe {
    sucess:boolean,
    message:string
}




export interface blogInput{
    tag:string,
    description:string,
    title:string,
    image?:{
        url:string,
        public_id:string
    }

}
export interface blogDocument extends blogInput, mongoose.Document{
    creaetedAt:Date,
    updatedAt:Date,
}
export interface blogData  {
    title:string,
    description:string,
    tag:string,
    image:{
        url:string,
        public_id:string
    }
}

// get a blog 
export interface getBlog {
    sucess:boolean,
    blog:Blog
}

// get All the blogs 
export interface AllBlog{
    sucess:boolean,
    blogs:Blogs
}



export interface UpdateblogData  {
    title?:string,
    description?:string,
    tag?:string,
    image?:{
        url:string,
        public_id:string
    }
}