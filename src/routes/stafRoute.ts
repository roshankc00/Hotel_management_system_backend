import { addAcheivementStaf, createStaf, deleteStaf, getAllStaf, getSingleStaf } from "../controllers/stafController"

const express=require('express')
const router=express.Router()


router.post('/staf',createStaf)
router.get('/staf/:id',getSingleStaf)
router.get('/stafs',getAllStaf)
router.delete('/staf/:id',deleteStaf)
router.put('/staf/:id',addAcheivementStaf)

export default router

