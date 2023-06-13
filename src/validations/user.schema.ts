import mongoose from 'mongoose';
import { Request } from 'express';
import {object,string} from 'zod'

 export const createUserSchema=object({
    name:string({
        required_error:"Name is required",
        invalid_type_error:"Name must be string",
    }),
    email:string({
        required_error:"email is required",
        invalid_type_error:"enter the valid email"
    }).email(),
    password:string({
        required_error:"password is required",
        invalid_type_error:"password must be string"

    })
 
})
.strict()



export interface CustomRequest extends Request {
    user?:UserDocument; 
  }
  export interface UserInput {
    email:string,
    password:string,
    name:string,
    role:string,    
}
export interface UserDocument extends UserInput, mongoose.Document{
    creaetedAt:Date,
    updatedAt:Date,
    comparePassword(password:string):Promise<boolean>;
}

export interface UserInput {
    email:string,
    password:string,
    name:string,
    role:string,    
}
export interface createUser {
    email:string,
    password:string,
    name:string,
}
export interface loginuser {
    email:string,
    password:string
}
export interface userres{
    sucess:boolean,
    token:string
}


export interface tokendata {
    id:mongoose.Schema.Types.ObjectId
}

















// if you define the not related data in varifying place then by default zod gona ignore it 

// if you wana throw the error then use strict() if wana pass then use passthrough()


