import express from 'express'
import { createFood, deleteFood, foodsWithLimitedField, getALLFoods, getFoodsByCategory, getSingleFood, updateFood } from '../controllers/foodController'
import { filterResults } from '../middlewares/filter_sort_pagination'
import FoodModel from '../models/foodModel'
import { checkAuth, checkRole } from '../middlewares/authmiddleware'
const router=express.Router()

router.post('/food/create',createFood)
router.get('/foods',filterResults(FoodModel),getALLFoods)
router.delete('/food/:id',checkAuth,checkRole('admin'),deleteFood)
router.get('/food/:id',getSingleFood)
router.put('/food/:id',checkAuth,checkRole('admin'),updateFood)
router.post('/foods/category',getFoodsByCategory)
router.get('/foods/limit',foodsWithLimitedField)

export default router
