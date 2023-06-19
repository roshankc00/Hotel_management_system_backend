import mongoose,{InferSchemaType} from "mongoose";
import { validateFoodMessage } from '../constants/validateschemamessage';

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
        required:[true,validateFoodMessage.REQUIRED_SLUG_MESSAGE]
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
            min:[1,validateFoodMessage.MIN_RATING_MESSAGE],
            max:[10,validateFoodMessage.MAX_RATING_MESSAGE]
        }

    }]

})


export type Food=InferSchemaType<typeof foodSchema>

const FoodModel=mongoose.model('Food',foodSchema)
export default FoodModel 