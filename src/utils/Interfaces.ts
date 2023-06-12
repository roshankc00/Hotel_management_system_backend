import mongoose from "mongoose";
import { Blog, Blogs } from "../models/blogmodel"
import { Staf } from "../models/stafmodel";
import { Testinomial } from '../models/testinomialmodel';

// for all the endpoints 
 export interface ParamId {
    id:any
 }
  
export interface resMe {
    sucess:boolean,
    message:string
}







// ---------------------------------blog -------------------

// blog data
export interface blogInput{
    tag:string,
    description:string,
    title:string,
    image?:{
        url:string,
        public_id:string
    }

}
export interface blogDocument extends blogInput, mongoose.Document{
    creaetedAt:Date,
    updatedAt:Date,
}
export interface blogData  {
    title:string,
    description:string,
    tag:string,
    image:{
        url:string,
        public_id:string
    }
}

// get a blog 
export interface getBlog {
    sucess:boolean,
    blog:Blog
}

// get All the blogs 
export interface AllBlog{
    sucess:boolean,
    blogs:Blogs
}



export interface UpdateblogData  {
    title?:string,
    description?:string,
    tag?:string,
    image?:{
        url:string,
        public_id:string
    }
}










//---------------------- staf interfaces -------------------
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

//--------------------- testinomial interface -----------------
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




// -----------------------------------user -------------------------------------
export interface UserInput {
    email:string,
    password:string,
    name:string,
    role:string,    
}
export interface createUser {
    email:string,
    password:string,
    name:string,
}
export interface loginuser {
    email:string,
    password:string
}
export interface userres{
    sucess:boolean,
    token:string
}

export interface UserDocument extends UserInput, mongoose.Document{
    creaetedAt:Date,
    updatedAt:Date,
    comparePassword(password:string):Promise<boolean>;
}
export interface tokendata {
    id:mongoose.Schema.Types.ObjectId
}