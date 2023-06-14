import mongoose,{InferSchemaType} from 'mongoose';
import { validateTestinomialMessage } from '../constants/validateschemamessage';
import { testiDocument, testiInput } from '../utils/Interfaces';



const testinomialSchema=new mongoose.Schema<testiInput>({
    name:{
        type:String,
        required:[true,validateTestinomialMessage.REQUIRED_NAME_MESSAGE],
        min:[3,"Enter the valid name"]
    },
    description:{
        type:String,
        required:[true,validateTestinomialMessage.REQUIRED_DESCRIPTION_MESSAGE],
        min:[10,validateTestinomialMessage.MIN_DESCRIPTION_MESSAGE],
        max:[500,validateTestinomialMessage.MAX_DESCRIPTION_MESSAGE]

    },
    image:{
        public_id:String,
        url:String
    }
},{timestamps:true})


export type Testinomial=InferSchemaType<typeof testinomialSchema>

const TestinomialModel=mongoose.model<testiDocument>("Testinomials",testinomialSchema)



export default TestinomialModel