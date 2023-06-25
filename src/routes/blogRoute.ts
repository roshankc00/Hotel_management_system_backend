import express from 'express';
import { createBlog, deleteBlog, getAllBlog, getSingleBlog, updateBlog } from '../controllers/blogController';
import upload from '../middlewares/multer';
const router=express.Router()


router.post('/blog',upload.single('image'),createBlog)
router.get('/blog/:id',getSingleBlog)
router.get('/blogs',getAllBlog)
router.put('/blog/:id',updateBlog)
router.delete('/blog/:id',deleteBlog)
router.put('/blog/changeimage/:id',upload.single('image'),deleteBlog)


export default router 