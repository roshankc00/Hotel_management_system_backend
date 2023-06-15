import { addAcheivementStaf, createStaf, deleteStaf, getAllStaf, getSingleStaf, promoteStaf, updateStaf } from "../controllers/stafController"
import { checkAuth } from "../middlewares/authmiddleware"

const express=require('express')
const router=express.Router()


router.post('/staf/create',createStaf)
router.get('/staf/:id',getSingleStaf)
router.get('/stafs',checkAuth,getAllStaf)
router.delete('/staf/:id',deleteStaf)
router.put('/staf/achievement/:id',addAcheivementStaf)
router.put('/staf/promote/:id',promoteStaf)
router.put('/staf/:id',updateStaf)

export default router

