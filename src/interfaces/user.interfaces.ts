import mongoose from 'mongoose';
import { Request } from 'express';
import {userZodMessage} from '../utils/zoderrormessages'
import {object,string} from 'zod'
import { User } from '../models/usermodel';

 export const createUserValid=object({
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
 export const createLoginValid=object({
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



export const forgetPasswordValid=object({
    email:string({
        required_error:userZodMessage.REQUIRED_EMAIL_MESSAGE,
        invalid_type_error:userZodMessage.INVALID_EMAIL_MESSAGE,
    }).email(),
}).strict()



export const resetPasswordValid=object({
    newPassword:string({
        required_error:userZodMessage.REQUIRED_PASSWORD_MESSAGE,
        invalid_type_error:userZodMessage.INVALID_PASSWORD_MESSAGE,
    }),
    confirmPassword:string({
        required_error:userZodMessage.REQUIRED_PASSWORD_MESSAGE,
        invalid_type_error:userZodMessage.INVALID_PASSWORD_MESSAGE,
    })
}).strict()


export const updatePasswordValid=object({
    newPassword:string({
        required_error:userZodMessage.REQUIRED_PASSWORD_MESSAGE,
        invalid_type_error:userZodMessage.INVALID_PASSWORD_MESSAGE,
    }),
    oldPassword:string({
        required_error:userZodMessage.REQUIRED_PASSWORD_MESSAGE,
        invalid_type_error:userZodMessage.INVALID_PASSWORD_MESSAGE,
    }),
    email:string({
        required_error:userZodMessage.REQUIRED_EMAIL_MESSAGE,
        invalid_type_error:userZodMessage.INVALID_EMAIL_MESSAGE,
    }).email(),

}).strict()























export interface CustomRequest extends Request {
    user?:any; 
  }
  export interface UserInput {
    email:string,
    password:string,
    name:string,
    role:string,    
}
export interface UserDocument extends UserInput, mongoose.Document{
    createdAt:Date,
    updatedAt:Date,
    comparePassword(password:string):Promise<boolean>;
    generateToken():Promise<string>;
}

export interface UserInput {
    email:string,
    password:string,
    name:string,
    role:string, 
    resetPasswordToken?:string,
    resetDateExpire?:Date
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
    error?:any,
    message?:string,
}

export interface resResetPassword {
    sucess?:boolean,
    error?:any
    message?:string
}


export interface tokendata {
    id:mongoose.Schema.Types.ObjectId
}



export interface resSinglerUser {
    sucess:boolean,
    user:User
}

export interface resAllUser {
    sucess:boolean,
    users: Array<User>
}
export interface resForgetPassword {
    sucess?:boolean,
    error?:any
    message?:string
}


export interface resupdatetPassword {
    sucess?:boolean,
    error?:any
    message?:string
}









// if you define the not related data in varifying place then by default zod gona ignore it 

// if you wana throw the error then use strict() if wana pass then use passthrough()


