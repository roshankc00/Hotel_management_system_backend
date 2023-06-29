import { number, object, string } from "zod";
import { Response, response } from "express";
import { RattingZodMessage, categoryFoodZodMessage, foodZodMessage } from "../utils/zoderrormessages";
import { Food } from "../models/foodModel";
import { filterResults } from '../middlewares/filter_sort_pagination';
import mongoose, { Document } from "mongoose";

export const validateCreateFood= object({
    name:string({
        required_error: foodZodMessage.REQUIRED_NAME_MESSAGE ,
        invalid_type_error:foodZodMessage.INVALID_NAME_MESSAGE 
    }),
    price:number({
        required_error: foodZodMessage.REQUIRED_PRICE_MESSAGE ,
        invalid_type_error:foodZodMessage.INVALID_PRICE_MESSAGE             
    }),
    discountPer:number({
        required_error: foodZodMessage.REQUIRED_DISCOUNTPER_MESSAGE,
        invalid_type_error:foodZodMessage.INVALID_DISCOUNTPER_MESSAGE 
    }),
    category:string({
        required_error: foodZodMessage.REQUIRED_CATEGORY_MESSAGE,
        invalid_type_error:foodZodMessage.INVALID_CATEGORY_MESSAGE
    }),
}).strict()


interface review {
    user:mongoose.Schema.Types.ObjectId,
    comment:string,
    rating:number
}
interface image {
    url:string,
    public_id:string
}

export interface foodInterface extends Document {
    name:string,
    price:number,
    discountPer:number,
    priceAfterDiscount:number,
    slug:string,
    category:string,
    review:review
    image:image
    

}


export const validateUpdateFood= object({
    name:string({
        required_error: foodZodMessage.REQUIRED_NAME_MESSAGE ,
        invalid_type_error:foodZodMessage.INVALID_NAME_MESSAGE 
    }).optional(),
    price:number({
        required_error: foodZodMessage.REQUIRED_PRICE_MESSAGE ,
        invalid_type_error:foodZodMessage.INVALID_PRICE_MESSAGE             
    }).optional(),
    discountPer:number({
        required_error: foodZodMessage.REQUIRED_DISCOUNTPER_MESSAGE,
        invalid_type_error:foodZodMessage.INVALID_DISCOUNTPER_MESSAGE 


    }),
    category:string({
        required_error: foodZodMessage.REQUIRED_CATEGORY_MESSAGE,
        invalid_type_error:foodZodMessage.INVALID_CATEGORY_MESSAGE


    }).optional(),



}).strict()


export const validateCategoryFood=object({
    category:string({
        required_error: categoryFoodZodMessage.REQUIRED_CATEGORY_MESSAGE,
        invalid_type_error:categoryFoodZodMessage.INVALID_CATEGORY_MESSAGE
    }),

}).strict()



export const validateReview=object({
    rating:number({
        required_error: RattingZodMessage.REQUIRED_RATING_MESSAGE,
        invalid_type_error:RattingZodMessage.INVALID_RATING_MESSAGE

    }),
    comment:string({
        required_error: RattingZodMessage.REQUIRED_COMMENT_MESSAGE,
        invalid_type_error:RattingZodMessage.INVALID_COMMENT_MESSAGE
    }),
    foodId:string({
        required_error:RattingZodMessage.REQUIRED_FOODID_MESSAGE,
        invalid_type_error:RattingZodMessage.INVALID_FOODID_MESSAGE
    }),

}).strict()

export interface createFoodResponse {
    sucess?:boolean,
    error?:any,
    food?:Food
}

export interface getAllFoodResponse {
    sucess?:boolean,
    allFoods?:Array<Food>
}
export interface CustomResponse extends Response {
    filterData?:any
  }


  export interface getSingleFoodResponse {
    sucess:boolean,
    food:Food
  }

  export interface updateFoodResponse {
    sucess?:boolean,
    error?:any,
    updatedFood?:Food,
    message?:string
}

export interface deleteFoodResponse {
    sucess:boolean,
    message:string
}

export interface getFoodsByCategoryResponse {
    error?:string,
    sucess?:boolean,
    foods?:Array <Food>
}

export interface addReviewFood {
    error?:string,
    sucess?:boolean,
    message?:string
    food?:Food
}

