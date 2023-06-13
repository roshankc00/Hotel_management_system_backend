import { NextFunction } from "express";
import {z} from 'zod'
import mongoose,{InferSchemaType} from "mongoose";
import pkg from 'validator'
const {isEmail}=pkg
import bcrypt from 'bcryptjs'
import { UserDocument, UserInput } from "../validations/user.schema";


const userSchema=new mongoose.Schema<UserInput>({
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

userSchema.pre(
    "save",
    async function(this:UserDocument,next){
        if(this.isModified('password')){
            this.password=await bcrypt.hash(this.password,10)
            return 
        }
        next()
    }
)

userSchema.methods.comparePassword=async function(password:string):Promise<boolean>{
    return await bcrypt.compare(password,this.password)
}

const UserModel=mongoose.model<UserDocument>('User',userSchema)
export default UserModel