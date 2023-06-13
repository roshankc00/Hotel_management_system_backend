import { Request,Response,NextFunction } from "express"
import {AnyZodObject} from 'zod'
const validate=(schema:AnyZodObject)=>(req:Request,res:Response)=>{
    try {
        schema.parse({
            body:req.body,
            query:req.query,
            params:req.params
        })
        
    } catch (error:any) {
        res.status(400).send(error.errors)
        
    }



}

export default validate;