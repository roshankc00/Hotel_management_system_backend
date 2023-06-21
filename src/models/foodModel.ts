import mongoose,{InferSchemaType} from "mongoose";
import { validateFoodMessage } from '../constants/validateschemamessage';
import slugify from "slugify";
import { NextFunction } from "express";

const foodSchema=new mongoose.Schema({
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

 


},{timestamps:true})
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