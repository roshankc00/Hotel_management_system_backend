import mongoose from 'mongoose';
import { Request } from 'express';
import {userZodMessage} from '../utils/zoderrormessages'
import {object,string} from 'zod'

 export const createUserSchema=object({
    name:string({
        required_error:userZodMessage.REQUIRED_EMAIL_MESSAGE,
        invalid_type_error:userZodMessage.INVALID_NAME_MESSAGE,
    }),
    email:string({
        required_error:userZodMessage.REQUIRED_EMAIL_MESSAGE,
        invalid_type_error:userZodMessage.INVALID_EMAIL_MESSAGE,
    }).email(),
    password:string({
        required_error:userZodMessage.REQUIRED_PASSWORD_MESSAGE,
        invalid_type_error:userZodMessage.INVALID_PASSWORD_MESSAGE,
    })
 
})
.strict()
 export const createLoginSchema=object({
    email:string({
        required_error:userZodMessage.REQUIRED_EMAIL_MESSAGE,
        invalid_type_error:userZodMessage.INVALID_EMAIL_MESSAGE,
    }).email(),
    password:string({
        required_error:userZodMessage.REQUIRED_PASSWORD_MESSAGE,
        invalid_type_error:userZodMessage.INVALID_PASSWORD_MESSAGE,
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
    sucess?:boolean,
    token?:string,
    error?:any
}


export interface tokendata {
    id:mongoose.Schema.Types.ObjectId
}

















// if you define the not related data in varifying place then by default zod gona ignore it 

// if you wana throw the error then use strict() if wana pass then use passthrough()


