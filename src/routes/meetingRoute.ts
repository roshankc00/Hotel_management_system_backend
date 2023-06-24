import express from 'express'
import { createMeeting, deleteMeeting, getAllMeetings, getSingleMeeting, updateMeeting } from '../controllers/meetingController'
import { checkAuth, checkRole } from '../middlewares/authmiddleware'
const router=express.Router()

router.post('/meeting',checkAuth,checkRole('admin'),createMeeting)
router.get('/meeting/:id',checkAuth,getSingleMeeting)
router.delete('/meeting/:id',checkAuth,deleteMeeting)
router.put('/meeting/:id',checkAuth,checkRole('admin'),updateMeeting)
router.get('/meetings',checkAuth,getAllMeetings)



export default router 