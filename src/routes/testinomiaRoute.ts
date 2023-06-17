import express from 'express';
import { changeTheUserImage, createTestinomial, deleteTestinomial, getASingleTestinomial, getAllTestinomial, updateTestinomial } from '../controllers/testinomialController';
import upload from '../middlewares/multer';

const router=express.Router()

router.post('/testinomial',upload.single('image'),createTestinomial)
router.get('/testinomial/:id',getASingleTestinomial)
router.get('/testinomials',getAllTestinomial)
router.put('/testinomial/:id',updateTestinomial)
router.delete('/testinomial/:id',deleteTestinomial)
router.put('/testinomial/updatepic/:id',upload.single('image'),changeTheUserImage)

export default router 

