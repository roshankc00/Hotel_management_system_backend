import express from 'express';
import { createTestinomial, deleteTestinomial, getASingleTestinomial, getAllTestinomial, updateTestinomial } from '../controllers/testinomialController';

const router=express.Router()

router.post('/testinomial',createTestinomial)
router.get('/testinomial/:id',getASingleTestinomial)
router.get('/testinomials',getAllTestinomial)
router.put('/testinomial/:id',updateTestinomial)
router.delete('/testinomial/:id',deleteTestinomial)

export default router 
