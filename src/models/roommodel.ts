import mongoose, { InferSchemaType } from "mongoose";
import { validateRoomMessage } from "../constants/validateschemamessage";
import { roomInterface } from "../interfaces/roominterface";
const roomSchema=new mongoose.Schema<roomInterface>({
    title:{
        type:String,
        required:[true,validateRoomMessage.REQUIRED_TITLE_MESSAGE],
        min:[3,validateRoomMessage.MIN_TITLE_MESSAGE],
        max:[3,validateRoomMessage.MAX_TITLE_MESSAGE],
    },
    description:{
        type:String,
        required:[true,validateRoomMessage.REQUIRED_DESCRIPTION_MESSAGE],
        min:[10,validateRoomMessage.MIN_DESCRIPTION_MESSAGE],
        max:[500,validateRoomMessage.MAX_DESCRIPTION_MESSAGE]

    },
    discountPer:{
        type:Number,
        required:true
    },
    priceAfterDiscount:{
        type:Number,
        requrired:true
    },
    price:{
        type:Number,
        required:[true,validateRoomMessage.REQUIRED_PRICE_MESSAGE],
    },
    category:{
        type:String,
        required:[true,"title is required"],
        min:[3,"enter the valid Category"]
    },
    image:{
        url:String,
        public_id:String
    },
    review:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        comment:{
            type:String,
        },
        rating:{
            type:Number,
            min:[1,validateRoomMessage.MIN_RATING_MESSAGE],
            max:[10,validateRoomMessage.MAX_RATING_MESSAGE]
        }
    }
    
    ]

},{timestamps:true})




export type Room =InferSchemaType <typeof roomSchema>







const RoomModel=mongoose.model<roomInterface>('Room',roomSchema)
export default RoomModel 