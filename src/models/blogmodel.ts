import mongoose,{InferSchemaType} from "mongoose";
import { blogDocument, blogInput } from "../utils/Interfaces";
import { validateBlogMessage } from "../constants/validateschemamessage";





const blogSchema=new mongoose.Schema<blogInput>({
    tag:{
        type:String,
        required:true,
        minLength:[3,validateBlogMessage.MIN_TAG_MESSAGE],
        maxLength:[10,validateBlogMessage.MAX_TAG_MESSAGE]
    },
    title:{
        type:String,
        required:[true,validateBlogMessage.REQUIRED_TITLE_MESSAGE],
        min:[5,validateBlogMessage.MIN_TITLE_MESSAGE],
        max:[50,validateBlogMessage.MAX_TITLE_MESSAGE],
    },
    description:{
        type:String,
        min:[5,validateBlogMessage.MIN_DESCRIPTION_MESSAGE],
        max:[5,validateBlogMessage.MAX_DESCRIPTION_MESSAGE],
        required:[true,validateBlogMessage.REQUIRED_DESCRIPTION_MESSAGE],
    },
    image:{
        url:String,
        public_id:String
    }
},{timestamps:true})


export type Blog=InferSchemaType<typeof blogSchema>
export type Blogs=Array<Blog>

const BlogModel=mongoose.model<blogDocument>('Blog',blogSchema)
export default BlogModel