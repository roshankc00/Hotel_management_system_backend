import express from 'express'
import { addReviewToFood, changeTheFoodImage, createFood, deleteFood, foodsWithLimitedField, getALLFoods, getFoodsByCategory, getSingleFood, updateFood } from '../controllers/foodController'
import { filterResults } from '../middlewares/filter_sort_pagination'
import FoodModel from '../models/foodModel'
import { checkAuth, checkRole } from '../middlewares/authmiddleware'
import upload from '../middlewares/multer'
import { Food } from '../models/foodModel';
const router=express.Router()


/**
 * @swagger
 *  /food/create:
 *   post:
 *     summary: add the food.
 *     tags: [Food]
 *     requestBody:
  *      required: true
 *      content:
 *       multipart/form-data:
 *         schema:
 *          type: object
 *          properties:
 *            name:
 *             type: string
 *            category:
 *             type: string
 *            price:
 *             type: number
 *            discountPer:
 *             type: number
 *            image:
 *             type: string
 *             format: binary
 *          example:
 *              name: Ham-burget 
 *              price: 10000 
 *              discountPer: 10 
 *              category: burger
 *     responses:
 *       200:
 *        description: food info with message food created sucessfully
 *       400:
 *        description: type error 
 *       500:
 *        description: internal server Error
 *
 * 
 *           
 * 
*/

router.post('/food/create',upload.single('image'),createFood)







router.get('/foods',filterResults(FoodModel),getALLFoods)

/**
 * @swagger
 * /food/{id}:
 *   delete:
 *     summary: delete  the food.
 *     tags: [Food]
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       desciption: mongo Id required
 *       schema:
 *          type: string
 *     responses:
 *       200:
 *        description: food deleted sucessfully
 *       400:
 *        description: No food exists 
 *       500:
 *        description: internal server Error
*/


router.delete('/food/:id',deleteFood)

/**
 * @swagger
 * /food/{id}:
 *   get:
 *     summary: get a single the single.
 *     tags: [Food]
  *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       desciption: mongo Id required
 *       schema:
 *          type: string
 *     responses:
 *       200:
 *        description: object of a foood
 *       400:
 *        description: No food exists 
 *       500:
 *        description: internal server Error
*/
router.get('/food/:id',getSingleFood)

/**
 * @swagger
 * /staf/{id}:
 *   put:
 *     summary: update the staf.
 *     tags: [Staf]
*     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       desciption: mongo Id required
 *       schema:
 *          type: string
 *     requestBody:
 *      content:
 *       multipart/form-data:
 *         schema:
 *          type: object
 *          properties:
 *            name:
 *             type: string
 *            category:
 *             type: string
 *            price:
 *             type: number
 *            discountPer:
 *             type: number
 *          example:
 *              name: Ham-burget 
 *              price: 10000 
 *              discountPer: 10 
 *              category: burger
 *     responses:
 *       200:
 *        description: staf info with message staf updated sucessfully 
 *       400:
 *        description: staf  must be unique 
 *       500:
 *        description: internal server Error
 *
 * 
 *           
 * 
*/


router.put('/food/:id',checkAuth,checkRole('admin'),updateFood)
/**
 * @swagger
 * /foods/limit:
 *   get:
 *     summary: getAll the foods with limited fields .
 *     tags: [Food]
 *     responses:
 *       200:
 *        description: array of the food with limited field
 *       400:
 *        description: no food exists
 *       500:
 *        description: internal server Error
*/
router.get('/foods/limit',foodsWithLimitedField)

/**
 * @swagger
 * /foods/{category}:
 *   post:
 *     summary: get all foods of same category.
 *     tags: [Food]
  *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *            category:
 *             type: string 
 *          example:
 *              category: burger
 *     responses:
 *       200:
 *        description: object of a foood with smae category
 *       400:
 *        description: No food exists 
 *       500:
 *        description: internal server Error
*/
router.post('/foods/category',getFoodsByCategory)



/**
 * @swagger
 * /food/addreview:
 *   post:
 *     summary: add the review.
 *     tags: [Food]
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *            rating:
 *             type: number
 *             description: rate form 1 to 10
 *            comment:
 *             type: string
 *          example:
 *              rating: 4 
 *              comment: the best one  
 *     responses:
 *       200:
 *        description: staf created sucessfully
 *       400:
 *        description: staf  must be unique 
 *       500:
 *        description: internal server Error
 *
 * 
 *           
 * 
*/
router.post('/food/addreview',checkAuth,addReviewToFood)


/**
 * @swagger
 * /food/changePicture/{id}:
 *   put:
 *     summary: change  the image of the food.
 *     tags: [Food]
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       desciption: mongo Id required
 *       schema:
 *          type: string
 *     requestBody:
  *      required: true
 *      content:
 *       multipart/form-data:
 *         schema:
 *          type: object
 *          properties:
 *            image:
 *             type: string
 *             format: binary
 *     responses:
 *       200:
 *        description: food info with message image updated  sucessfully
 *       400:
 *        description: type error message 
 *       500:
 *        description: internal server Error
 *
 * 
 *           
 * 
*/

router.put('/food/changePicture/:id',checkAuth,upload.single('image'),changeTheFoodImage)

export default router
