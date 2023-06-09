import express from 'express';
import { createBlog, deleteBlog, getAllBlog, getSingleBlog, updateBlog } from '../controllers/blogController';
const router=express.Router()


router.post('/blog',createBlog)
router.get('/blog/:id',getSingleBlog)
router.get('/blogs',getAllBlog)
router.put('/blog/:id',updateBlog)
router.delete('/blog/:id',deleteBlog)

export default router 