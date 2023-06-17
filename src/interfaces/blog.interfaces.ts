import mongoose from "mongoose"
import { Blog, Blogs } from "../models/blogmodel"
import { object, string } from "zod"
import { CREATE_BLOG } from "../utils/zoderrormessages"







export const validateCreateBlog=object({
    tag:string({
        required_error:CREATE_BLOG.INVALID_TAG_MESSAGE,
        invalid_type_error:CREATE_BLOG.INVALID_TAG_MESSAGE

    }),
    description:string({
        required_error:CREATE_BLOG.REQUIRED_DECRIPTION_MESSAGE,
        invalid_type_error:CREATE_BLOG.INVALID_DESCRIPTION_MESSAGE
    

    }),
    title:string({
        required_error:CREATE_BLOG.REQUIRED_TITLE_MESSAGE,
        invalid_type_error:CREATE_BLOG.REQUIRED_TITLE_MESSAGE
    })
})
.strict()




export const validateUpdateBlog=object({
    tag:string({
        required_error:CREATE_BLOG.INVALID_TAG_MESSAGE,
        invalid_type_error:CREATE_BLOG.INVALID_TAG_MESSAGE

    }).optional(),
    description:string({
        required_error:CREATE_BLOG.REQUIRED_DECRIPTION_MESSAGE,
        invalid_type_error:CREATE_BLOG.INVALID_DESCRIPTION_MESSAGE
    

    }).optional(),
    title:string({
        required_error:CREATE_BLOG.REQUIRED_TITLE_MESSAGE,
        invalid_type_error:CREATE_BLOG.REQUIRED_TITLE_MESSAGE
    }).optional()
})
.strict()





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