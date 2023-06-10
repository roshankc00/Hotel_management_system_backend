import { Blog } from "../models/blogmodel"
import { Testinomial } from '../models/testinomialmodel';

 export interface ParamId {
    id:string
 }
  
export interface resMe {
    sucess:boolean,
    message:string
}
export interface resBlog {
    sucess:boolean,
    blog:Blog
}



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


