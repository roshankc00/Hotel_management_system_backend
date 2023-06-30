import c from "config";
import { number, object, string } from "zod";
import { roomZodMessages } from "../utils/zoderrormessages";
import { Room } from "../models/roommodel";
import { Food } from "../models/foodModel";
import { Response } from "express";
import { image } from "./testinomial.interfaces";
import { review } from "./foodInterface";
export const validateCreateRoom=object({
    title:string({
        invalid_type_error:roomZodMessages.INVALID_TITLE_MESSAGE,
        required_error:roomZodMessages.REQUIRED_TITLE_MESSAGE
    }),
    description:string({
        invalid_type_error:roomZodMessages.INVALID_DESCRIPTION_MESSAGE,
        required_error:roomZodMessages.REQUIRED_DECRIPTION_MESSAGE
    }),
    discountPer:number({
        invalid_type_error:roomZodMessages.REQUIRED_DISCOUNTPER_MESSAGE,
        required_error:roomZodMessages.REQUIRED_DISCOUNTPER_MESSAGE


    }),
    price:number({
        invalid_type_error:roomZodMessages.INVALID_PRICE_MESSAGE,
        required_error:roomZodMessages.REQUIRED_PRICE_MESSAGE

    }),
    category:string({
        invalid_type_error:roomZodMessages.INVALID_CATEGORY_MESSAGE,
        required_error:roomZodMessages.REQUIRED_CATEGORY_MESSAGE

    })
    

}).strict()


export const validateUpdateRoom=object({
    title:string({
        invalid_type_error:roomZodMessages.INVALID_TITLE_MESSAGE,
        required_error:roomZodMessages.REQUIRED_TITLE_MESSAGE
    }).optional(),
    description:string({
        invalid_type_error:roomZodMessages.INVALID_DESCRIPTION_MESSAGE,
        required_error:roomZodMessages.REQUIRED_DECRIPTION_MESSAGE
    }).optional(),
    discountPer:number({
        invalid_type_error:roomZodMessages.REQUIRED_DISCOUNTPER_MESSAGE,
        required_error:roomZodMessages.REQUIRED_DISCOUNTPER_MESSAGE


    }).optional(),
    price:number({
        invalid_type_error:roomZodMessages.INVALID_PRICE_MESSAGE,
        required_error:roomZodMessages.REQUIRED_PRICE_MESSAGE

    }).optional(),
    category:string({
        invalid_type_error:roomZodMessages.INVALID_CATEGORY_MESSAGE,
        required_error:roomZodMessages.REQUIRED_CATEGORY_MESSAGE

    }).optional()
    

}).strict()





export interface roomInterface extends Document {
    title:string,
    description:string,
    discountPer:number,
    priceAfterDiscount:number,
    price:number,
    category:string,
    image:image,
    review:Array <review>


}

export interface createRoomResponse {
    error?:any,
    sucess?:boolean,
    room?:Room,
    message?:string

}

export interface getASingleRoomResponse {
    sucess:boolean,
    room:Room
}

export interface getAllRoomsResponse {
    sucess:boolean,
    room:Array <Room>
}

export interface CustomResponse extends Response {
    filterData?:any
  }

  export interface updateRoomResponse  {
    error?:any,
    sucess?:boolean,
    updatedRoom?:Room,
    message?:string

  }

 export  interface getRoomsByCategoryResponse {
    error?:any,
    sucess?:boolean,
    rooms?:Array <Room>,
    message?:string
 }

 export interface deleteRoomResponse{
    sucess?:boolean,
    message?:string,
     }

export interface addReviewResponse {
    error?:any,
    sucess?:boolean,
    room?:Room,
    message?:string
}

export interface changeRoomImageResponse {
    sucess?:boolean,
    room?:Room,
    message?:string
}