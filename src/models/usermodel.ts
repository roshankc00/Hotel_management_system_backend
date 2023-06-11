import mongoose,{InferSchemaType} from "mongoose";
import pkg from 'validator'
const {isEmail}=pkg
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"username is required"],
        minLength:[3,"enter the valid name"]
    },
    email:{
        type:String,
        required:true,
        validate:[isEmail,"enter the proper email"]
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"user",
    },
},{timestamps:true})

export type User= InferSchemaType<typeof userSchema>

const UserModel=mongoose.model('User',userSchema)
export default UserModel