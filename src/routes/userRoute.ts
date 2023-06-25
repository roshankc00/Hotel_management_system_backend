import express from 'express';
import { deleteUser, forgetPassword, getASingleUser, getAllUsers, loginUser, registerUser, resetPassword, updatePassword, updateRole } from '../controllers/userController';
import { checkAuth, checkRole } from '../middlewares/authmiddleware';


const router=express.Router()









/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register the user.
 *     tags: [User]
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *            email:
 *             type: string
 *            password:
 *             type: string
 *            name:
 *             type: string 
 *          example:
 *              name: Roshan karki 
 *              email: roshankc@gmail.com
 *              password: me@R2jdj
 *     responses:
 *       200:
 *        description: User created sucessfully with token
 *       400:
 *        description: User already exists
 *       500:
 *        description: internal server Error
 *
 * 
 *           
 * 
*/

router.post('/user/register',registerUser)
/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: L ogin  the user.
 *     tags: [User]
 *     requestBody:
 *      content:
 *       application/json: 
 *         schema:
 *          type: object
 *          properties:
 *            email:
 *             type: string
 *            password:
 *             type: string
 *          example:
 *              email: roshankc@gmail.com
 *              password: me@R2jdj
 *     responses:
 *       200:
 *        description: User loged in sucessfully with token
 *       400:
 *        description: User not found 
 *       500:
 *        description: internal server Error
*/
router.post('/user/login',loginUser)
/**
 * @swagger
 * /user/forgetpassword:
 *   put:
 *     summary: forget the user.
 *     tags: [User]
 *     requestBody:
 *      content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *            email:
 *             type: string
 *          example:
 *              email: roshankc@gmail.com
 *     responses:
 *       200:
 *        description: mail sent sucessfully
 *       400:
 *        description: User dont exists
 *       500:
 *        description: internal server Error
 *
 * 
 *           
 * 
*/
router.put('/user/forgetpassword',forgetPassword)

/**
 * @swagger
 * /user/password/reset/${token}:
 *   put:
 *     summary: update  the user password.
 *     tags: [User]
 *     parameters:
 *     - in: path
 *       name: token
 *       required: true
 *       desciption: token required
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
 *            newPassword:
 *             type: string
 *            confirmPassword:
 *             type: string
 *          example:
 *              newPassword: ram123#E
 *              confirmPassword: kxaHero#2
 *     responses:
 *       200:
 *        description: mail sent sucessfully
 *       400:
 *        description: User dont exists
 *       500:
 *        description: internal server Error
 *
 * 
 *           
 * 
*/

router.put('/user/password/reset/:token',resetPassword)
/**
 * @swagger
 * /user/updatepassword:
 *   put:
 *     summary: forget the user.
 *     tags: [User]
 *     requestBody:
 *      content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *            email:
 *             type: string
 *            newPassword:
 *             type: string
 *            oldPassword:
 *             type: string
 *          example:
 *              email: roshankc@gmail.com
 *              oldPassword: ram123#E
 *              newPassword: kxaHero#2
 *     responses:
 *       200:
 *        description: mail sent sucessfully
 *       400:
 *        description: User dont exists
 *       500:
 *        description: internal server Error
 *
 * 
 *           
 * 
*/
router.put('/user/updatepassword',updatePassword)
// admin only 
/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: get A single the user.
 *     tags: [User]
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       desciption: Numerice Id required
 *       schema:
 *          type: string
 *     responses:
 *       200:
 *        description: mail sent sucessfully
 *       400:
 *        description: User dont exists
 *       500:
 *        description: internal server Error
*/
router.get('/user/:id',getASingleUser)
/**
 * @swagger
 * /users:
 *   get:
 *     summary: getAll the user.
 *     tags: [User]
 *     responses:
 *       200:
 *        description: array of the users
 *       400:
 *        description: Npo user exists 
 *       500:
 *        description: internal server Error
*/
router.get('/users',checkAuth,checkRole("admin"),getAllUsers)
/**
 * @swagger
 * /user/changerole/{id}:
 *   put:
 *     summary: forget the user.
 *     tags: [User]
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
 *            role:
 *             type: string
 *          example:
 *             role: user
 *     responses:
 *       200:
 *        description: mail sent sucessfully
 *       400:
 *        description: User dont exists
 *       500:
 *        description: internal server Error
 *
 * 
 *           
 * 
*/

router.put('/user/changerole/:id',checkAuth,checkRole("admin"),updateRole)
/**
 * @swagger
 * /user/delete/{id}:
 *   delete:
 *     summary: delete  the user.
 *     tags: [User]
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       desciption: mongo Id required
 *       schema:
 *          type: string
 *     responses:
 *       200:
 *        description: array of the users
 *       400:
 *        description: Npo user exists 
 *       500:
 *        description: internal server Error
*/
router.delete('/user/delete/:id',checkAuth,checkRole("admin"),deleteUser)



export default router 
