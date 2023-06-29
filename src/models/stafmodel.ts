import mongoose,{InferSchemaType} from "mongoose";
import pkg  from 'validator'
import { validateStafMessage } from "../constants/validateschemamessage";
import { stafInterface } from "../interfaces/staf.interfaces";
const {isEmail}=pkg


const stafSchema=new mongoose.Schema<stafInterface>({
    name:{
        type:String,
        required:[true,validateStafMessage.REQUIRED_name_MESSAGE],
        min:[4,validateStafMessage.MIN_NAME_MESSAGE],
        max:[30,validateStafMessage.MAX_NAME_MESSAGE]
    },
    address:{
        type:String,
        required:[true,validateStafMessage.REQUIRED_name_MESSAGE],
        min:[3,validateStafMessage.MIN_NAME_MESSAGE],
        max:[30,validateStafMessage.MAX_NAME_MESSAGE]
    },
    position:{
        type:String,
        required:[true,validateStafMessage.REQUIRED_position_MESSAGE],
    },
    salary:{
        type:Number,
        required:[true,validateStafMessage.REQUIRED_salary_MESSAGE],
    },
    email:{
        type:String,
        required:[true,validateStafMessage.REQUIRED_email_MESSAGE],
        unique:[true,validateStafMessage.VALID_email_MESSAGE],
        match:[
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            validateStafMessage.VALID_email_MESSAGE
        ],
        
    },
    age:{
        type:Number,
        required:[true,validateStafMessage.REQUIRED_age_MESSAGE]

        },
    acheiveaments:[{
        type:String
        }],
    phoneNumber:{
        type:Number,
        min:[9,"Enter the valid phone number"],
        required:[true,validateStafMessage.REQUIRED_phoneNumber_MESSAGE]
    }    
},{timestamps:true})

export type Staf=InferSchemaType<typeof stafSchema>


const StafModel=mongoose.model<stafInterface>("Staf",stafSchema)
export default StafModel



