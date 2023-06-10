import mongoose,{InferSchemaType} from 'mongoose';


const testinomialSchema=new mongoose.Schema({
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

const TestinomialModel=mongoose.model("Testinomials",testinomialSchema)



export default TestinomialModel