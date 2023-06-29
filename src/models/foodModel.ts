import mongoose,{InferSchemaType} from "mongoose";
import { validateFoodMessage, validateRoomMessage } from '../constants/validateschemamessage';
import slugify from "slugify";
import { NextFunction } from "express";
import { foodInterface } from "../interfaces/foodInterface";

const foodSchema=new mongoose.Schema<foodInterface>({
    name:{
        type:String,
        required:[true,validateFoodMessage.REQUIRED_NAME_MESSAGE],
        min:[3,validateFoodMessage.MIN_NAME_MESSAGE],
    },
    price:{
        type:Number,
        required:[true,validateFoodMessage.REQUIRED_PRICE_MESSAGE],
    },
    discountPer:{
        type:Number,
        required:[true,validateFoodMessage.REQUIRED_DISCOUNT_MESSAGE]
    },
    priceAfterDiscount:{
        type:Number,
        requrired:[true,validateFoodMessage.REQUIRED_PRICEAFTERDISCOUNT_MESSAGE]
    },
    slug:{
        type:String,
    },
    category:{
        type:String,
        requried:[true,validateFoodMessage.REQUIRED_CATEGORY_MESSAGE],
        min:[3,validateFoodMessage.MIN_CATEGORY_MESSAGE]
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
    ],
    image:{
        url:String,
        public_id:String
    },
}
    ,{timestamps:true})

    
export type Food=InferSchemaType<typeof foodSchema>


foodSchema.pre(
    "save",
    async function(this:Food,next){
        this.slug=slugify(this.name.toLowerCase())
        console.log(this.slug) 
        next()
    }
)







const FoodModel=mongoose.model('Food',foodSchema)
export default FoodModel 