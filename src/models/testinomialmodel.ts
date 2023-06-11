import mongoose,{InferSchemaType} from 'mongoose';

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


const testinomialSchema=new mongoose.Schema<testiInput>({
    name:{
        type:String,
        required:true,
        minLength:[3,"Enter the valid name"]
    },
    description:{
        type:String,
        required:true,
        minLength:[10,"Enter the valid description"]

    },
    image:{
        public_id:String,
        url:String
    }
},{timestamps:true})


export type Testinomial=InferSchemaType<typeof testinomialSchema>

const TestinomialModel=mongoose.model<testiDocument>("Testinomials",testinomialSchema)



export default TestinomialModel