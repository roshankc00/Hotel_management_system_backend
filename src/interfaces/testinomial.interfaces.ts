import mongoose from "mongoose"
import { Testinomial } from "../models/testinomialmodel"
import { object, string } from "zod"
import { CREATE_TESTINOMIAL } from "../utils/zoderrormessages"



export const validateCreateTestinomial=object({
    name:string({
        invalid_type_error:CREATE_TESTINOMIAL.INVALID_NAME_MESSAGE,
        required_error:CREATE_TESTINOMIAL.REQUIRED_NAME_MESSAGE
       }),
    description:string({
        invalid_type_error:CREATE_TESTINOMIAL.INVALID_DESCRIPTION_MESSAGE,
        required_error:CREATE_TESTINOMIAL.REQUIRED_DECRIPTION_MESSAGE
    })
})
.strict()


export const validateUpdateTestinomial=object({
    name:string({
        invalid_type_error:CREATE_TESTINOMIAL.INVALID_NAME_MESSAGE,
        required_error:CREATE_TESTINOMIAL.REQUIRED_NAME_MESSAGE
       }).optional(),
    description:string({
        invalid_type_error:CREATE_TESTINOMIAL.INVALID_DESCRIPTION_MESSAGE,
        required_error:CREATE_TESTINOMIAL.REQUIRED_DECRIPTION_MESSAGE
    }).optional()
})
.strict()















export interface ParamId {
    id:any
 }
  
export interface resMe {
    sucess:boolean,
    message:string
}

export interface testinomialData {
    name:string,
    description:string,
    image?:string

}
export interface testinomialUpdateData {
    name?:string,
    description?:string,
}
export interface testinomialgetData {
    sucess:boolean,
    testinomoial:Testinomial
}
export interface testinomialgetAllData {
    sucess:boolean,
    testinomials:Array<Testinomial>
}
export interface image {
    public_id:string,
    url:string
}
export interface testiInput {
    name:string,
    description:string,
    image:image,
}
export interface testiDocument extends testiInput, mongoose.Document{
    createdAt:Date,
    updatedAt:Date,
}