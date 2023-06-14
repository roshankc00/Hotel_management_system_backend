import { NextFunction } from "express";
import mongoose,{InferSchemaType} from "mongoose";
import bcrypt from 'bcryptjs'
import { UserDocument, UserInput } from "../validations/user.ctrl";
import { validateUserModel } from "../constants/validateschemamessage";


const userSchema=new mongoose.Schema<UserInput>({
    name:{
        type:String,
        required:[true,validateUserModel.REQUIRED_NAME_MESSAGE],
        min:[3,"enter the valid name"]
    },
    email:{
        type:String,
        required:[true,validateUserModel.REQUIRED_EMAIL_MESSAGE],
        match:[
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            validateUserModel.VALID_EMAIL_MESSAGE
        ],

    },
    password:{
        type:String,
        required:[true,validateUserModel.REQUIRED_PASSWORD_MESSAGE],
        match:[
            /"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$"/,
            validateUserModel.VALID_PASSWORD_MESSAGE
        ]
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