import express from 'express'
import { addReviewRoom, createRoom, deleteRoom, getASingleRoom, getAllRooms, getRoomsByCategory, updateRooms,changeRoomImage } from '../controllers/roomController'
import upload from '../middlewares/multer'
import { checkAuth } from '../middlewares/authmiddleware'
import { filterResults } from '../middlewares/filter_sort_pagination'
import RoomModel from '../models/roommodel'
const router=express.Router()

router.post('/room',upload.single('image'),createRoom)
router.get('/room/:id',getASingleRoom)
router.get('/rooms',filterResults(RoomModel),getAllRooms)
router.put('/room/:id',updateRooms)
router.delete('/room/:id',deleteRoom)
router.post('/room/category',getRoomsByCategory)
router.post('/room/addreview',checkAuth,addReviewRoom)
router.post('/room/changePicture/:id',checkAuth,upload.single('image'),changeRoomImage)


export default router 