 export type ParamId=string
 




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

