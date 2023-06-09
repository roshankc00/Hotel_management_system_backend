import mongoose,{InferSchemaType} from "mongoose";
const blogSchema=new mongoose.Schema({
    tag:{
        type:String,
        required:true,
        minLength:3,
        maxLength:10
    },
    title:{
        type:String,
        required:true,
        minLength:5,
    },
    description:{
        type:String,
        mixLength:5,
        required:true,
    },
    image:{
        url:String,
        public_id:String
    }
},{timestamps:true})


export type Blog=InferSchemaType<typeof blogSchema>
export type Blogs=Array<Blog>

const BlogModel=mongoose.model('Blog',blogSchema)
export default BlogModel