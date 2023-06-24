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







router.post('/user/login',loginUser)
router.put('/user/forgetpassword',forgetPassword)
router.put('/user/password/reset/:token',resetPassword)
router.put('/user/updatepassword',updatePassword)
// admin only 
router.get('/user/:id',checkAuth,checkRole("admin"),getASingleUser)
router.get('/users',checkAuth,checkRole("admin"),getAllUsers)
router.get('/user/changerole/:id',checkAuth,checkRole("admin"),updateRole)
router.delete('/user/delete/:id',checkAuth,checkRole("admin"),deleteUser)



export default router 
