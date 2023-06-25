import express from 'express';
import { changeTheUserImage, createTestinomial, deleteTestinomial, getASingleTestinomial, getAllTestinomial, updateTestinomial } from '../controllers/testinomialController';
import upload from '../middlewares/multer';

const router=express.Router()

 /**
 * @swagger
 * components:
 *   schemas:
 *     Testinomial:
 *       type: object
 *       required:
 *         -name
 *         -description
 *         -image
 *       properties:
 *         name:
 *           type: string
 *           description: name of the User
 *         description:
 *           type: string
 *           description: description of the good quality
 *         image:
 *           type: object
 *           description: includes the url and the public id 
 *       example:
 *         name: ROshan karki  
 *         description: the best resturant 

*/


















/**
 * @swagger
 * /testinomial:
 *   post:
 *     summary: Register the testinomial.
 *     tags: [Testinomial]
 *     requestBody:
  *      required: true
 *      content:
 *       multipart/form-data:
 *         schema:
 *          type: object
 *          properties:
 *            name:
 *             type: string
 *            description:
 *             type: string
 *            image:
 *             type: string
 *             format: binary
 * 
 *          example:
 *              name: Roshan karki 
 *              description: the best experience ever,
 *     responses:
 *       200:
 *        description: testinomial created sucessfully
 *       400:
 *        description: type error 
 *       500:
 *        description: internal server Error
 *
 * 
 *           
 * 
*/
router.post('/testinomial',upload.single('image'),createTestinomial)
/**
 * @swagger
 * /testinomial/{id}:
 *   get:
 *     summary: get a single the meeting.
 *     tags: [Testinomial]
  *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       desciption: mongo Id required
 *       schema:
 *          type: string
 *     responses:
 *       200:
 *        description: object of a testininimial
 *       400:
 *        description: No testinomial exists 
 *       500:
 *        description: internal server Error
*/
router.get('/testinomial/:id',getASingleTestinomial)

/**
 * @swagger
 * /testinomials:
 *   get:
 *     summary: getAll the testinomials.
 *     tags: [Testinomial]
 *     responses:
 *       200:
 *        description: array of the testinomial
 *       400:
 *        description: Noo testinomial exists 
 *       500:
 *        description: internal server Error
*/
router.get('/testinomials',getAllTestinomial)
/**
 * @swagger
 * /testinomial/{id}:
 *   put:
 *     summary: update the testinomial.
 *     tags: [Testinomial]
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
 *            description:
 *             type: string
 * 
 *          example:
 *              name: Roshan karki 
 *              description: the best experience ever,
 *     responses:
 *       200:
 *        description: testinomial info with  testinomial updated message
 *       400:
 *        description: type error 
 *       500:
 *        description: internal server Error
 *
 * 
 *           
 * 
*/
router.put('/testinomial/:id',updateTestinomial)
/**
 * @swagger
 * /testinomial/{id}:
 *   delete:
 *     summary: delete  the .testinomial
 *     tags: [Testinomial]
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       desciption: mongo Id required
 *       schema:
 *          type: string
 *     responses:
 *       200:
 *        description: testinomial deleted sucessfully
 *       400:
 *        description: No testinomial exists 
 *       500:
 *        description: internal server Error
*/
router.delete('/testinomial/:id',deleteTestinomial)

/**
 * @swagger
 * /testinomial/updatepic/{id}:
 *   put:
 *     summary: change  the image of the testinomial.
 *     tags: [Testinomial]
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
 *        description: testinoial info with message image updated  sucessfully
 *       400:
 *        description: type error 
 *       500:
 *        description: internal server Error
 *
 * 
 *           
 * 
*/
router.put('/testinomial/updatepic/:id',upload.single('image'),changeTheUserImage)

export default router 

