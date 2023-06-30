import asyncHandler from "express-async-handler";
import RoomModel from "../models/roommodel";
import { Response,Request } from "express";
import validateMongodbId from "../utils/mongodbIdValidator";
import cloudinary from "../config/CloudinaryConfig";
import { CustomResponse, addReviewResponse, changeRoomImageResponse, createRoomResponse, deleteRoomResponse, getASingleRoomResponse, getRoomsByCategoryResponse, updateRoomResponse, validateCreateRoom, validateUpdateRoom } from "../interfaces/roominterface";
import { validateCategoryFood, validateReview } from "../interfaces/foodInterface";
import { CustomRequest } from "../interfaces/user.interfaces";

export const createRoom=asyncHandler(async(req:Request,res:Response<createRoomResponse>)=>{
    try {
        const {title,description,discountPer,price,category}=req.body
                    // validating the req.body type 
                    let  result=validateCreateRoom.safeParse(req.body)
                    let wow:any=JSON.stringify(result,null,2)
                     wow=JSON.parse(wow)
                    if(!wow.success){
                        res.status(400).json({
                            error:wow
                        })
                        return 
                    }

        const cloud:any = await cloudinary.v2.uploader.upload(req.file.path)
        let disAmount:number=(discountPer*price)/100;
        let priceAfterDiscount:number=price-disAmount
        const room=await RoomModel.create({
            title,
            description,
            discountPer,
            price,
            category,
            priceAfterDiscount,
            image:{
                url:cloud.secure_url,
                public_id:cloud.public_id,
            }

        })
        res.status(200).json({
            sucess:true,
            message:"created sucess fully",
            room
        })
    } catch (error:any) {
        throw new Error(error)
    }
})



export const getASingleRoom=asyncHandler(async(req:Request,res:Response<getASingleRoomResponse>)=>{
    try {
        const id:string=req.params.id
        validateMongodbId(id)
        const room=await RoomModel.findById(id)
        if(!room){
            throw new Error("room not found")
        }
        res.status(200).json({
            sucess:true,
            room
        })
        
    } catch (error:any) {
        throw new Error(error)
    }
})



export const getAllRooms=asyncHandler(async(req:Request,res:CustomResponse)=>{
    try {
        const rooms=await RoomModel.find({})
        if(!rooms){
            throw new Error("no rooms found")
        }

        let allRooms=res.filterData
        res.status(200).json({
            sucess:true,
            allRooms
        })
    } catch (error:any) {
        throw new Error(error)
        
    }
})




export const updateRooms=asyncHandler(async(req:Request,res:Response<updateRoomResponse>)=>{
    try {
        const id:string=req.params.id
        validateMongodbId(id)
        
            // validating the req.body type 
            let  result=validateUpdateRoom.safeParse(req.body)
            let wow:any=JSON.stringify(result,null,2)
             wow=JSON.parse(wow)
            if(!wow.success){
                res.status(400).json({
                    error:wow
                })
                return 
            }



        let room=await RoomModel.findById(id)
        if(!room){
            throw new Error("room not found")
        }
        if(!req.body.discountPer){
            req.body.discountPer=room.discountPer           
        }
        if(!req.body.price){
            req.body.price=room.price                    
        }
        let disAmt=(req.body.discountPer*req.body.price)/100
         req.body.priceAfterDiscount=req.body.price-disAmt
        let updRoom=await RoomModel.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json({
            sucess:true,
            updatedRoom:updRoom
        })
    } catch (error:any) {
        throw new Error(error)
            
    }
})


// get the rooms by category
export const getRoomsByCategory=asyncHandler(async(req:Request,res:Response<getRoomsByCategoryResponse>)=>{
    try {
        let {category}=req.body
            // validating the req.body type 
            let  result=validateCategoryFood.safeParse(req.body)
            let wow:any=JSON.stringify(result,null,2)
             wow=JSON.parse(wow)
            if(!wow.success){
                res.status(400).json({
                    error:wow
                })
                return 
            }  
        

        let rooms=await RoomModel.find({category})
        if(!rooms){
            throw new Error("no food found")
        }
        res.status(200).json({
            sucess:true,
            rooms
        })
    } catch (error:any) {
        throw new Error(error)        
    }
})

// delete the room 
export const deleteRoom=asyncHandler(async(req:Request,res:Response<deleteRoomResponse>)=>{
    try {
        const id=req.params.id
        validateMongodbId(id)
        const room=await RoomModel.findById(id)
        if(!room){
            throw new Error("room not found")
        }
        const destroy=await cloudinary.v2.uploader.destroy(room.image.public_id)
        const delRoom=await RoomModel.findByIdAndDelete(id)
        res.status(200).json({
            sucess:true,
            message:"room deleted sucessfully",
        })
        
    } catch (error:any) {
        throw new Error(error)
        
    }
})



// add the review 
export const addReviewRoom=asyncHandler(async(req:CustomRequest,res:Response<addReviewResponse>)=>{
    try {
        const {rating,comment,id}=req.body
        validateMongodbId(id)
            // validating the req.body type 
            let  result=validateReview.safeParse(req.body)
            let wow:any=JSON.stringify(result,null,2)
             wow=JSON.parse(wow)
            if(!wow.success){
                res.status(400).json({
                    error:wow
                })
                return 
            }



        let alreadyReviewed=false
        const room=await RoomModel.findById(id)
        if(!room){
            throw new Error("the food doesnt exists")
        }
        const destroy=await cloudinary.v2.uploader.destroy(room.image.public_id)
        room.review.map(async(el:any,ind:number)=>{
            if(el.user.toString()===req.user._id.toString()){
                room.review.splice(ind,1)
                alreadyReviewed=true
            }
        })
        room.review.push({
            user:req.user._id,
            comment,
            rating
        }) 
      await room.save()
      res.status(200).json({
        sucess:true,
        message:"review added sucessfully",
        room
      })
      

    } catch (error:any) {
        throw new Error(error)
    }
})




export const changeRoomImage=asyncHandler(async(req:Request,res:Response<changeRoomImageResponse>)=>{
    try {
        validateMongodbId(req.params.id)
        const room=await RoomModel.findById(req.params.id)
        if(!room){
            throw new Error('food not found')
        }
        const destroy=await cloudinary.v2.uploader.destroy(room.image.public_id)
        const cloud:any = await cloudinary.v2.uploader.upload(req.file.path)
        console.log(cloud)
        room.image={
            url:cloud.secure_url,
            public_id:cloud.public_id,
        }
        
            await room.save()
            res.status(200).json({
                sucess:true,
                message:"image updated sucessfully",
                
            })
            
    } catch (error:any) {
        throw new Error(error.message)
        
    }


})