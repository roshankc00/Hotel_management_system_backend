import mongoose, { Schema } from "mongoose";
const reviewSchema=new Schema({
    star:{
        type:Number,
        required:[true,"Star is necessary"],

    },
    comment:{
        type:Number,
        required:[true,"comment is also required"]
    },

},{timestamps:true})




const ReviewModel=mongoose.model("Review",reviewSchema)
module.exports=ReviewModel
