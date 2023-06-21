import express from 'express'
import { createFood, getALLFoods } from '../controllers/foodController'
import { filterResults } from '../middlewares/filter_sort_pagination'
import FoodModel from '../models/foodModel'
const router=express.Router()

router.post('/food/create',createFood)
router.get('/foods',filterResults(FoodModel),getALLFoods)

export default router
