import { addAcheivementStaf, createStaf, deleteStaf, getAllStaf, getSingleStaf, promoteStaf, updateStaf } from "../controllers/stafController"
import { checkAuth } from "../middlewares/authmiddleware"

const express=require('express')
const router=express.Router()
 /**
 * @swagger
 * components:
 *   schemas:
 *     Staf:
 *       type: object
 *       required:
 *         -name
 *         -email
 *         -age
 *         -address
 *         -position
 *         -salary
 *       properties:
 *         name:
 *           type: string
 *           description: name of the User
 *         email:
 *           type: string
 *           description: email  of the staf 
 *         address:
 *           type: string
 *           description: address of the staf 
 *         position:
 *           type: string
 *           description: position of the staf 
 *         salary:
 *           type: number 
 *           description: salary of the staf
 *         age:
 *           type: number 
 *           description: age of the staf 
 *         acheivements:
 *           type: Array
 *           description: acheivement  of the staf
 *         phoneNumber:
 *           type: number
 *           description: Phone Number of the staf

 *       example:
 *         name: ROshan karki  
 *         email: roshankc813@gmail.com
 *         address: Nayamill-01-Butwal
 *         postition: Manager
 *         salary: 100000
 *         age: 20
 *         acheivements: ["best worker","best employee of 2009"]
 *         phoneNumber: 98475981627

*/



















/**
 * @swagger
 * /staf/create:
 *   post:
 *     summary: Register the staf.
 *     tags: [Staf]
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *            email:
 *             type: string
 *            name:
 *             type: string
 *            address:
 *             type: string 
 *            position:
 *             type: string 
 *            age:
 *             type: number 
 *            phoneNumber:
 *             type: number 
 *            salary:
 *             type: number 
 *          example:
 *              name: Roshan karki 
 *              email: roshankc@gmail.com
 *              phoneNumber: 9847582627
 *              age: 45
 *              salary: 40000
 *              position: manager
 *              address: nayamill
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
router.post('/staf/create',createStaf)
/**
 * @swagger
 * /staf/{id}:
 *   get:
 *     summary: get a single the staf.
 *     tags: [Staf]
  *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       desciption: mongo Id required
 *       schema:
 *          type: string
 *     responses:
 *       200:
 *        description: object of a staf info with sucess true
 *       400:
 *        description: No staf exists 
 *       500:
 *        description: internal server Error
*/
router.get('/staf/:id',getSingleStaf)
/**
 * @swagger
 * /stafs:
 *   get:
 *     summary: getAll the user.
 *     tags: [Staf]
 *     responses:
 *       200:
 *        description: array of the stafs
 *       400:
 *        description: No staf exists 
 *       500:
 *        description: internal server Error
*/
router.get('/stafs',getAllStaf)
/**
 * @swagger
 * /staf/{id}:
 *   delete:
 *     summary: delete  the staf.
 *     tags: [Staf]
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       desciption: mongo Id required
 *       schema:
 *          type: string
 *     responses:
 *       200:
 *        description: staf deleted sucessfully
 *       400:
 *        description: No staf exists 
 *       500:
 *        description: internal server Error
*/
router.delete('/staf/:id',deleteStaf)
/**
 * @swagger
 * /staf/achievement/{id}:
 *   post:
 *     summary: add achievement of the staf.
 *     tags: [Staf]
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
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *            achievement:
 *             type: string
 *     responses:
 *       200:
 *        description: staf info
 *       400:
 *        description: No staf exists 
 *       500:
 *        description: internal server Error
*/
router.post('/staf/achievement/:id',addAcheivementStaf)
/**
 * @swagger
 * /staf/promote/{id}:
 *   put:
 *     summary: promote  the staf.
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
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *            position:
 *             type: string
 *     responses:
 *       200:
 *        description: staf info with message staf has been promoted
 *       400:
 *        description: No staf exists 
 *       500:
 *        description: internal server Error
*/
router.put('/staf/promote/:id',promoteStaf)

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
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *            email:
 *             type: string
 *            name:
 *             type: string
 *            address:
 *             type: string 
 *            position:
 *             type: string 
 *            age:
 *             type: number 
 *            phoneNumber:
 *             type: number 
 *            salary:
 *             type: number 
 *          example:
 *              name: Roshan karki 
 *              email: roshankc@gmail.com
 *              phoneNumber: 9847582627
 *              age: 45
 *              salary: 40000
 *              position: manager
 *              address: nayamill
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
router.put('/staf/:id',updateStaf)

export default router

