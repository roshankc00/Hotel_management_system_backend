import mongoose from "mongoose";
import { validateMeetingMessage } from "../constants/validateschemamessage";

const meetingSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,validateMeetingMessage.REQUIRED_TITLE_MESSAGE],
        min:[5,validateMeetingMessage.MIN_TITLE_MESSAGE],
        max:[50,validateMeetingMessage.MAX_TITLE_MESSAGE]
    },
    description:{
        type:String,
        required:[true,validateMeetingMessage.REQUIRED_DESCRIPTION_MESSAGE],
        min:[10,validateMeetingMessage.MIN_DESCRIPTION_MESSAGE],
        max:[500,validateMeetingMessage.MAX_DESCRIPTION_MESSAGE],
    },
    time:{
        type:Date,
        required:[true,validateMeetingMessage.REQUIRED_TIME_MESSAGE]
    },
    venue:{
        type:String,
        required:[true,validateMeetingMessage.REQUIRED_VENUE_MESSAGE],
        min:[3,validateMeetingMessage.MIN_VENUE_MESSAGE]
    }

},{timestamps:true})




const MeetingModel=mongoose.model('Meeting',meetingSchema)
export default MeetingModel