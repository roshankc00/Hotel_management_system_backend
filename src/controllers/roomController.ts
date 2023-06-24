import asyncHandler from "express-async-handler";
import RoomModel from "../models/roommodel";
import validateMongodbId from "../utils/mongodbIdValidator";
import cloudinary from "../config/CloudinaryConfig";

export const createRoom=asyncHandler(async(req,res)=>{
    try {
        const {title,description,discountPer,price,category}=req.body
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

export const getASingleRoom=asyncHandler(async(req,res)=>{
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


export const getAllRooms=asyncHandler(async(req,res:any)=>{
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




export const updateRooms=asyncHandler(async(req,res)=>{
    try {
        const id:string=req.params.id
        validateMongodbId(id)
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
export const getRoomsByCategory=asyncHandler(async(req,res)=>{
    try {
        let {category}=req.body
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
export const deleteRoom=asyncHandler(async(req,res)=>{
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
export const addReviewRoom=asyncHandler(async(req:any,res)=>{
    try {
        const {rating,comment,id}=req.body
        validateMongodbId(id)
        let alreadyReviewed=false
        const room=await RoomModel.findById(id)
        if(!room){
            throw new Error("the food doesnt exists")
        }
        // const destroy=await cloudinary.v2.uploader.destroy(room.image)
        room.review.map(async(el,ind)=>{
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

export const changeRoomImage=asyncHandler(async(req:any,res:any)=>{
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
           return  res.status(200).json({
                status:true,
                message:"image updated sucessfully",
                room
                
            })
            
    } catch (error:any) {
        throw new Error(error.message)
        
    }


})