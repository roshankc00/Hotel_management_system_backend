import express from 'express';
import { loginUser, registerUser } from '../controllers/userController';


const router=express.Router()

router.post('/user/register',registerUser)
router.post('/user/login',loginUser)

export default router 
