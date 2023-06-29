import { object, string } from "zod";
import { meetingZodMessage } from "../utils/zoderrormessages";
import { Meeting } from "../models/meetingmodel";
import { image } from "./testinomial.interfaces";

export const validateCreateMeeting=object({
    title:string({
        required_error:meetingZodMessage.REQUIRED_TITLE_MESSAGE,
        invalid_type_error:meetingZodMessage.INVALID_TITLE_MESSAGE
             
    }),
    description:string({
        required_error:meetingZodMessage.REQUIRED_DECRIPTION_MESSAGE,
        invalid_type_error:meetingZodMessage.INVALID_DESCRIPTION_MESSAGE
    
    }),
    venue:string({
        required_error:meetingZodMessage.REQUIRED_VENUE_MESSAGE,
        invalid_type_error:meetingZodMessage.INVALID_VENUE_MESSAGE

    })
})
.strict()


export const validateUpdateMeeting=object({
    title:string({
        required_error:meetingZodMessage.REQUIRED_TITLE_MESSAGE,
        invalid_type_error:meetingZodMessage.INVALID_TITLE_MESSAGE
             
    }).optional(),
    description:string({
        required_error:meetingZodMessage.REQUIRED_DECRIPTION_MESSAGE,
        invalid_type_error:meetingZodMessage.INVALID_DESCRIPTION_MESSAGE
    
    }).optional(),
    venue:string({
        required_error:meetingZodMessage.REQUIRED_VENUE_MESSAGE,
        invalid_type_error:meetingZodMessage.INVALID_VENUE_MESSAGE

    }).optional()
})
.strict()







export interface meetingInterface extends Document {
    title:string,
    description:string,
    venue:string

}




export interface createMeetingResponse {
    error?:string,
    sucess?:boolean,
    meeting?:Meeting,
    message?:string
}
export interface updateMeetingResponse {
    error?:string,
    sucess?:boolean,
    updatedMeeting?:Meeting,
    message?:string
}


export interface getSingleMeetingResponse {
    sucess:boolean,
    meeting:Meeting
}


export interface getDeleteMeetingResponse {
    sucess:boolean,
    message?:string
}

export interface getAllMeetingResponse {
    sucess:boolean,
    meetings:Array<Meeting>
}
export interface validateMeetingParamId {
    id:string

}