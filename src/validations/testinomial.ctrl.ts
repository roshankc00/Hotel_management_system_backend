import mongoose from "mongoose"
import { Testinomial } from "../models/testinomialmodel"




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
    image?:{
        url:string,
        public_id:string
    }

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
    image:string,
}
export interface testiDocument extends testiInput, mongoose.Document{
    createdAt:Date,
    updatedAt:Date,
}