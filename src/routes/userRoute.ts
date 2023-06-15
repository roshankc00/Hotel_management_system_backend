import express from 'express';
import { deleteUser, forgetPassword, getASingleUser, getAllUsers, loginUser, registerUser, updateRole } from '../controllers/userController';


const router=express.Router()


router.post('/user/register',registerUser)
router.post('/user/login',loginUser)
router.get('/user/:id',getASingleUser)
router.get('/users',getAllUsers)
router.get('/user/changerole/:id',updateRole)
router.delete('/user/delete',deleteUser)
router.put('/user/forgetpassword',forgetPassword)



export default router 
