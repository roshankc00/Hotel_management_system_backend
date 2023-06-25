import express from 'express'
import { addReviewRoom, createRoom, deleteRoom, getASingleRoom, getAllRooms, getRoomsByCategory, updateRooms,changeRoomImage } from '../controllers/roomController'
import upload from '../middlewares/multer'
import { checkAuth } from '../middlewares/authmiddleware'
import { filterResults } from '../middlewares/filter_sort_pagination'
import RoomModel from '../models/roommodel'
const router=express.Router()





/**
 * @swagger
 *  /room/create:
 *   post:
 *     summary: add the Room.
 *     tags: [Room]
 *     requestBody:
  *      required: true
 *      content:
 *       multipart/form-data:
 *         schema:
 *          type: object
 *          properties:
 *            title:
 *             type: string
 *            description:
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
 *              title: the best room in the town 
 *              category: 1-star-room
 *              price: 10000 
 *              discountPer: 10 
 *              description: all the services will be provided
 *     responses:
 *       200:
 *        description: roominfo with message room created sucessfully
 *       400:
 *        description: type error 
 *       500:
 *        description: internal server Error
 *
 * 
 *           
 * 
*/
router.post('/room/create',upload.single('image'),createRoom)
/**
 * @swagger
 * /room/{id}:
 *   get:
 *     summary: get a single the room.
 *     tags: [Room]
  *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       desciption: mongo Id required
 *       schema:
 *          type: string
 *     responses:
 *       200:
 *        description: object of a room
 *       400:
 *        description: No room exists 
 *       500:
 *        description: internal server Error
*/
router.get('/room/:id',getASingleRoom)

/**
 * @swagger
 * /rooms:
 *   get:
 *     summary: getAll the rooms.
 *     tags: [Room]
 *     parameters:
 *       - in: query
 *       - name: page
 *         description: The page number
 *         default: 1
 *         example: 1
 *       - in: query
 *       - name: limit
 *         description: The page limit
 *         default: 10
 *         example: 10
 *       - in: query
 *       - name: sort
 *         description: The sort name
 *         default: -createdAt
 *     responses:
 *       200:
 *        description: array of the rooms
 *       400:
 *        description: No staf exists 
 *       500:
 *        description: internal server Error
*/

router.get('/rooms',filterResults(RoomModel),getAllRooms)
/**
 * @swagger
 * /room/{id}:
 *   put:
 *     summary: update the room.
 *     tags: [Room]
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
 *            title:
 *             type: string
 *            description:
 *             type: string
 *            category:
 *             type: string
 *            price:
 *             type: number
 *            discountPer:
 *             type: number
 *          example:
 *              title: the best room in the town 
 *              category: 1-star-room
 *              price: 10000 
 *              discountPer: 10 
 *              description: all the services will be provided
 *     responses:
 *       200:
 *        description: room info with message room updated sucessfully 
 *       400:
 *        description: no room exists
 *       500:
 *        description: internal server Error
 *
 * 
 *           
 * 
*/
router.put('/room/:id',updateRooms)

/**
 * @swagger
 * /room/{id}:
 *   delete:
 *     summary: delete  the room.
 *     tags: [Room]
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       desciption: mongo Id required
 *       schema:
 *          type: string
 *     responses:
 *       200:
 *        description: room deleted sucessfully
 *       400:
 *        description: No room exists 
 *       500:
 *        description: internal server Error
*/
router.delete('/room/:id',deleteRoom)
/**
 * @swagger
 * /rooms/{category}:
 *   post:
 *     summary: get all rooms of same category.
 *     tags: [Room]
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
 *              category: 1-star-room
 *     responses:
 *       200:
 *        description: object of a room with smae category
 *       400:
 *        description: No food exists 
 *       500:
 *        description: internal server Error
*/

router.post('/rooms/category',getRoomsByCategory)
/**
 * @swagger
 * /room/addreview:
 *   post:
 *     summary: add the review.
 *     tags: [Room]
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
 *        description: review added sucessfully
 *       400:
 *        description: type error
 *       500:
 *        description: internal server Error
 *
 * 
 *           
 * 
*/
router.post('/room/addreview',checkAuth,addReviewRoom)

/**
 * @swagger
 * /room/changePicture/{id}:
 *   put:
 *     summary: change  the image of the room.
 *     tags: [Room]
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
 *        description: room info with message image updated  sucessfully
 *       400:
 *        description: type error message 
 *       500:
 *        description: internal server Error
 *
 * 
 *           
 * 
*/

router.put('/room/changePicture/:id',checkAuth,upload.single('image'),changeRoomImage)


export default router 