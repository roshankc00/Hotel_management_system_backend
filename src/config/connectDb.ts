import mongoose from "mongoose";
import env from '../utils/validateEnv'
const connectDb=()=>{
    mongoose.connect(env.MONGO_URL).then(()=>{
        console.log("connected to the database")
    }).catch((err)=>{
        console.log(err)
    })
}

export default connectDb