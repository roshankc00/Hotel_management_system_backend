import express from 'express'
import { createMeeting, deleteMeeting, getAllMeetings, getSingleMeeting, updateMeeting } from '../controllers/meetingController'
const router=express.Router()

router.post('/meeting',createMeeting)
router.get('/meeting/:id',getSingleMeeting)
router.delete('/meeting/:id',deleteMeeting)
router.put('/meeting/:id',updateMeeting)
router.get('/meetings',getAllMeetings)



export default router 