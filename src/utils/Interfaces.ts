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




// blog 

// blog data
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










// staf interfaces 
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

// testinomial interface 
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


