import asyncHandler from "express-async-handler";
import RoomModel from "../models/roommodel";
import validateMongodbId from "../utils/mongodbIdValidator";

export const createRoom=asyncHandler(async(req,res)=>{
    try {
        const {title,desciption,discountPer,price,category}=req.body
        let disAmount:number=(discountPer*price)/100;
        let priceAfterDiscount:number=price-disAmount
        const room=await RoomModel.create({
            title,
            desciption,
            discountPer,
            price,
            category,
            priceAfterDiscount
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


export const getAllRooms=asyncHandler(async(req,res)=>{
    try {
        const rooms=await RoomModel.find({})
        if(!rooms){
            throw new Error("no rooms found")
        }
        res.status(200).json({
            sucess:true,
            rooms
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
        if(!req.body.discountPer){
            req.body.discountPer=room.discountPer           
        }
        if(!req.body.price){
            req.body.price=room.price                    
        }
        if(!room){
            throw new Error("room not found")
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


// get the room by category
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


export const deleteRoom=asyncHandler(async(req,res)=>{
    try {
        const id=req.params.id
        validateMongodbId(id)

        const room=await RoomModel.findById(id)
        if(!room){
            throw new Error("room not found")
        }
        const udpRoom=await RoomModel.findByIdAndDelete(id)
        res.status(200).json({
            sucess:true,
            message:"room deleted sucessfully",
        })
        
    } catch (error:any) {
        throw new Error(error)
        
    }
})

