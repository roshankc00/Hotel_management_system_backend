import express from 'express';
import { deleteUser, forgetPassword, getASingleUser, getAllUsers, loginUser, registerUser, resetPassword, updateRole } from '../controllers/userController';


const router=express.Router()


router.post('/user/register',registerUser)
router.post('/user/login',loginUser)
router.get('/user/:id',getASingleUser)
router.get('/users',getAllUsers)
router.get('/user/changerole/:id',updateRole)
router.delete('/user/delete',deleteUser)
router.put('/user/forgetpassword',forgetPassword)
router.put('/user/password/reset/:token',resetPassword)



export default router 
