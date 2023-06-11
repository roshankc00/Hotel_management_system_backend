import mongoose,{InferSchemaType} from "mongoose";
import pkg  from 'validator'
const {isEmail}=pkg
const stafSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"staff name is required"],
        minLength:[4,"enter the valid name"]
    },
    address:{
        type:String,
        required:[true,"staff address is required"],
        minLength:[4,"enter the valid name"]
    },
    position:{
        type:String,
        required:[true,"staff position is required"],
    },
    salary:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email is required"],
        validate:[isEmail,"enter the valid email"]
    },
    age:{
        type:Number,
        },
    acheiveaments:[{
        type:String
        }],
    phoneNumber:{
        type:Number,
        minlength:[9,"Enter the valid phone number"]
    }    
},{timestamps:true})

export type Staf=InferSchemaType<typeof stafSchema>


const StafModel=mongoose.model("Staf",stafSchema)
export default StafModel



