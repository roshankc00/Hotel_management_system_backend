import mongoose ,{Document}from "mongoose"
import { Staf } from "../models/stafmodel"
import {number, object,string} from 'zod'
import { ACHEIVEMENT_AND_POSITION_MESSAGE, stafZodmessage } from "../utils/zoderrormessages"

export const createStafInterfaceValid=object({
    name:string({
        required_error:stafZodmessage.REQUIRED_NAME_MESSAGE,
        invalid_type_error:stafZodmessage.INVALID_NAME_MESSAGE
    }),
    email:string({
        required_error:stafZodmessage.REQUIRED_EMAIL_MESSAGE,
        invalid_type_error:stafZodmessage.INVALID_EMAIL_MESSAGE

    }),
    position:string({
        required_error:stafZodmessage.REQUIRED_POSITION_MESSAGE,
        invalid_type_error:stafZodmessage.INVALID_POSITION_MESSAGE

    }),
    salary:number({
        required_error:stafZodmessage.REQUIRED_POSITION_MESSAGE,
        invalid_type_error:stafZodmessage.INVALID_SALARY_MESSAGE

    }),
    phoneNumber:number({
        required_error:stafZodmessage.REQUIRED_PHONENUMBER_MESSAGE,
        invalid_type_error:stafZodmessage.INVALID_PHONENUMBER_MESSAGE

    }),
    address:string({
        required_error:stafZodmessage.REQUIRED_ADDRESS_MESSAGE,
        invalid_type_error:stafZodmessage.INVALID_ADDRESS_MESSAGE

    }),
    age:number({
        required_error:stafZodmessage.REQUIRED_AGE_MESSAGE,
        invalid_type_error:stafZodmessage.INVALID_AGE_MESSAGE
    })
    
})
.strict()

export interface stafInterface extends Document {
    name:string,
    address:string,
    position:string,
    acheiveaments:string,
    salary:number,
    email:any,
    age:number,
    phoneNumber:number

}



export const updateStafInterfaceValid=object({
    name:string({
        required_error:stafZodmessage.REQUIRED_NAME_MESSAGE,
        invalid_type_error:stafZodmessage.INVALID_NAME_MESSAGE
    }).optional(),
    email:string({
        required_error:stafZodmessage.REQUIRED_EMAIL_MESSAGE,
        invalid_type_error:stafZodmessage.INVALID_EMAIL_MESSAGE

    }).optional(),
    position:string({
        required_error:stafZodmessage.REQUIRED_POSITION_MESSAGE,
        invalid_type_error:stafZodmessage.INVALID_POSITION_MESSAGE

    }).optional(),
    salary:number({
        required_error:stafZodmessage.REQUIRED_POSITION_MESSAGE,
        invalid_type_error:stafZodmessage.INVALID_SALARY_MESSAGE

    }).optional(),
    phoneNumber:number({
        required_error:stafZodmessage.REQUIRED_PHONENUMBER_MESSAGE,
        invalid_type_error:stafZodmessage.INVALID_PHONENUMBER_MESSAGE

    }).optional(),
    address:string({
        required_error:stafZodmessage.REQUIRED_ADDRESS_MESSAGE,
        invalid_type_error:stafZodmessage.INVALID_ADDRESS_MESSAGE

    }).optional(),
    age:number({
        required_error:stafZodmessage.REQUIRED_AGE_MESSAGE,
        invalid_type_error:stafZodmessage.INVALID_AGE_MESSAGE
    }).optional()
    
})
.strict()



export const stafAchievementValid=object({
    achievement:string({
        required_error:ACHEIVEMENT_AND_POSITION_MESSAGE.REQUIRED_ACHEIVEMENT_MESSAGE,
        invalid_type_error:ACHEIVEMENT_AND_POSITION_MESSAGE.INVALID_ACHEIVEMENT_MESSAGE
    })
}).strict()


export const stafPositionValid=object({
    position:string({
        required_error:ACHEIVEMENT_AND_POSITION_MESSAGE.REQUIRED_POSITION_MESSAGE,
        invalid_type_error:ACHEIVEMENT_AND_POSITION_MESSAGE.INVALID_POSITION_MESSAGE,
    })

}).strict()




export interface createStafRes {
    sucess?:boolean,
    message?:string,
    staf?:Staf,
    error?:any
    
}



export interface updateStafRes {
    sucess?:boolean,
    message?:string,
    staf?:Staf,
    error?:any

}






export interface stafData {
    name:String,
    address:string,
    position:string,
    age:number,
    salary:number,
    email:string,
    achievement?:Array<string>
    phoneNumber:number,
    }
    export interface ParamId {
        id:any
     }
      
    export interface resMe {
        sucess:boolean,
        message?:string,
        error?:any
    }

    export interface promote {
        position:string
    }
    export interface achievement {
        achievement:string
    }


export interface getStaf {
    sucess:boolean,
    staf:Staf
}

export interface param {
    id:string
}

export interface allstaf{
    sucess:boolean,
    stafs:Array<Staf>

}

export interface stafInput {
    name:string,
    address:string,
    position:string,
    salary:number,
    email:string,
    age:number,
    phoneNumber:number,
    achievement:Array<string>
}
export interface stafDocument extends stafInput, mongoose.Document{
    createdAt:Date,
    updatedAt:Date,
}
