import express from 'express';
import { deleteUser, forgetPassword, getASingleUser, getAllUsers, loginUser, registerUser, resetPassword, updatePassword, updateRole } from '../controllers/userController';
import { checkAuth, checkRole } from '../middlewares/authmiddleware';


const router=express.Router()


router.post('/user/register',registerUser)
router.post('/user/login',loginUser)
router.get('/user/:id',checkAuth,checkRole("admin"),getASingleUser)
router.get('/users',getAllUsers)
router.get('/user/changerole/:id',updateRole)
router.delete('/user/delete/:id',checkAuth,checkRole("admin"),deleteUser)
router.put('/user/forgetpassword',forgetPassword)
router.put('/user/password/reset/:token',resetPassword)
router.put('/user/updatepassword',updatePassword)



export default router 
