import asyncHandler from 'express-async-handler'
import MeetingModel from '../models/meetingmodel'
import validateMongodbId from '../utils/mongodbIdValidator'

export const createMeeting=asyncHandler(async(req,res)=>{
    try {
        let {title,description,venue}=req.body
        if(!title || !description || !venue){
            throw new Error("all the fields are required")
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

export const getSingleMeeting=asyncHandler(async(req,res)=>{
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

export const getAllMeetings=asyncHandler(async(req,res)=>{
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

export const deleteMeeting=asyncHandler(async(req,res)=>{
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


export const updateMeeting=asyncHandler(async(req,res)=>{
    try {
        const id=req.params.id
        validateMongodbId(id)
        const meeting=await MeetingModel.findById(id)
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