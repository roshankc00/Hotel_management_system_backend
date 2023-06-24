import asyncHandler from 'express-async-handler'
import { Request,Response } from 'express'
import MeetingModel from '../models/meetingmodel'
import validateMongodbId from '../utils/mongodbIdValidator'
import { validateMeetingMessage } from '../constants/validateschemamessage'
import { createMeetingResponse, getAllMeetingResponse, getDeleteMeetingResponse, getSingleMeetingResponse, updateMeetingResponse, validateCreateMeeting, validateUpdateMeeting } from '../interfaces/meetingInterface'

export const createMeeting=asyncHandler(async(req:Request,res:Response<createMeetingResponse>)=>{
    try {
        let {title,description,venue}=req.body
        if(!title || !description || !venue){
            throw new Error("all the fields are required")
        }
               // validating the req.body type 
               let  result=validateCreateMeeting.safeParse(req.body)
               let wow:any=JSON.stringify(result,null,2)
                wow=JSON.parse(wow)
               if(!wow.success){
                   res.status(400).json({
                       error:wow
                   })
                   return 
               }

        let meeting=await MeetingModel.create({
            title,
            description,
            venue
        })
        res.status(200).json({
            sucess:true,
            message:"meeting added to the database",
            meeting,
        })
        
    } catch (error:any) {
        throw new Error(error)
        
    }

})

export const getSingleMeeting=asyncHandler(async(req:Request,res:Response<getSingleMeetingResponse>)=>{
    try {
        let id=req.params.id
        validateMongodbId(id)
        const meeting=await MeetingModel.findById(id)
        if(!meeting){
            throw new Error("meeting not found")
        }
        res.status(200).json({
            sucess:true,
            meeting
        })
    } catch (error:any) {
        throw new Error(error)
        
    }
})

export const getAllMeetings=asyncHandler(async(req:Request,res:Response<getAllMeetingResponse>)=>{
    try {
        const meetings=await MeetingModel.find({})
        if(!meetings){
            throw new Error("meeting not found")
        }
        else{
            res.status(200).json({
                sucess:true,
                meetings
            })
        }        
    } catch (error:any) {
        throw new Error(error)
        
    }
})

export const deleteMeeting=asyncHandler(async(req:Request,res:Response<getDeleteMeetingResponse>)=>{
    try {
        const id=req.params.id
        validateMongodbId(id)
        const meeting=await MeetingModel.findById(id)
        if(!meeting){
            throw new Error("meeting not found")
        }
        let delMeet=await MeetingModel.findByIdAndDelete(id)
        res.status(200).json({
            sucess:true,
            message:"deleted sucessfully"

        })
        
    } catch (error:any) {
        throw new Error(error)        
    }
})


export const updateMeeting=asyncHandler(async(req:Request,res:Response<updateMeetingResponse>)=>{
    try {
        const id=req.params.id
        validateMongodbId(id)
        const meeting=await MeetingModel.findById(id)
               // validating the req.body type 
               let  result=validateUpdateMeeting.safeParse(req.body)
               let wow:any=JSON.stringify(result,null,2)
                wow=JSON.parse(wow)
               if(!wow.success){
                   res.status(400).json({
                       error:wow
                   })
                   return 
               }
        if(!meeting){
            throw new Error("meeting not found")
        }
        const updMeet=await MeetingModel.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json({
            sucess:true,
            message:"updated sucessfully",
            updatedMeeting:updMeet
        })
        
    } catch (error:any) {
        throw new Error(error)        
    }
})