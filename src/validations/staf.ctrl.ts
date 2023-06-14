import mongoose from "mongoose"
import { Staf } from "../models/stafmodel"

export interface stafData {
    name:String,
    address:string,
    position:string,
    age:number,
    salary:number,
    email:string,
    achievement?:Array<string>
    phoneNumber:number,
    }
    export interface ParamId {
        id:any
     }
      
    export interface resMe {
        sucess:boolean,
        message:string
    }

    export interface promote {
        position:string
    }
    export interface achievement {
        achievement:string
    }


export interface getStaf {
    sucess:boolean,
    staf:Staf
}

export interface param {
    id:string
}

export interface allstaf{
    sucess:boolean,
    stafs:Array<Staf>

}



export interface stafInput {
    name:string,
    address:string,
    position:string,
    salary:number,
    email:string,
    age:number,
    phoneNumber:number,
    achievement:Array<string>
}
export interface stafDocument extends stafInput, mongoose.Document{
    createdAt:Date,
    updatedAt:Date,
}
