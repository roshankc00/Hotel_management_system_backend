import express from 'express'
import { addReviewToFood, changeTheFoodImage, createFood, deleteFood, foodsWithLimitedField, getALLFoods, getFoodsByCategory, getSingleFood, updateFood } from '../controllers/foodController'
import { filterResults } from '../middlewares/filter_sort_pagination'
import FoodModel from '../models/foodModel'
import { checkAuth, checkRole } from '../middlewares/authmiddleware'
import upload from '../middlewares/multer'
import { Food } from '../models/foodModel';
const router=express.Router()

router.post('/food/create',upload.single('image'),createFood)
router.get('/foods',filterResults(FoodModel),getALLFoods)
router.delete('/food/:id',checkAuth,checkRole('admin'),deleteFood)
router.get('/food/:id',getSingleFood)
router.put('/food/:id',checkAuth,checkRole('admin'),updateFood)
router.get('/foods/limit',foodsWithLimitedField)
router.post('/foods/category',getFoodsByCategory)
router.post('/food/addreview',checkAuth,addReviewToFood)
router.put('/food/changePicture/:id',checkAuth,upload.single('image'),changeTheFoodImage)

export default router
