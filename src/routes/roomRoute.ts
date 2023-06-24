import express from 'express'
import { createRoom, deleteRoom, getASingleRoom, getAllRooms, getRoomsByCategory, updateRooms } from '../controllers/roomController'
import { getAllStaf } from '../controllers/stafController'
const router=express.Router()

router.post('/room',createRoom)
router.get('/room/:id',getASingleRoom)
router.get('/rooms',getAllRooms)
router.put('/room/:id',updateRooms)
router.delete('/room/:id',deleteRoom)
router.post('/room/category',getRoomsByCategory)


export default router