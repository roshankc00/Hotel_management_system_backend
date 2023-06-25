import express from 'express';
import { createBlog, deleteBlog, getAllBlog, getSingleBlog, updateBlog } from '../controllers/blogController';
import upload from '../middlewares/multer';
const router=express.Router()


/**
 * @swagger
 * /blog:
 *   post:
 *     summary: create the blog.
 *     tags: [Blog]
 *     requestBody:
  *      required: true
 *      content:
 *       multipart/form-data:
 *         schema:
 *          type: object
 *          properties:
 *            tag:
 *             type: string
 *            title:
 *             type: string
 *            description:
 *             type: string
 *            image:
 *             type: string
 *             format: binary
 *          example:
 *              tag: entertainment
 *              title: all about today
 *              description: the best experience ever ,
 *     responses:
 *       200:
 *        description: blog info with message blog created sucessfully
 *       400:
 *        description: type error 
 *       500:
 *        description: internal server Error
 *
 * 
 *           
 * 
*/
router.post('/blog',upload.single('image'),createBlog)
/**
 * @swagger
 * /blog/{id}:
 *   get:
 *     summary: get a single the Blog.
 *     tags: [Blog]
  *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       desciption: mongo Id required
 *       schema:
 *          type: string
 *     responses:
 *       200:
 *        description: object of a blog
 *       400:
 *        description: No blog exists 
 *       500:
 *        description: internal server Error
*/

router.get('/blog/:id',getSingleBlog)
/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: getAll the blogs.
 *     tags: [Blog]
 *     responses:
 *       200:
 *        description: array of the blogs
 *       400:
 *        description: Noo blogs exists 
 *       500:
 *        description: internal server Error
*/

router.get('/blogs',getAllBlog)
/**
 * @swagger
 * /blog/{id}:
 *   put:
 *     summary: update the blog.
 *     tags: [Blog]
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
 *            tag:
 *             type: string
 *            title:
 *             type: string
 *            description:
 *             type: string
 *          example:
 *              tag: entertainment
 *              title: all about today
 *              description: the best experience ever ,
 *     responses:
 *       200:
 *        description: vlog info with message vlog updated sucessfully
 *       400:
 *        description: type error 
 *       500:
 *        description: internal server Error
 *
 * 
 *           
 * 
*/

router.put('/blog/:id',updateBlog)
/**
 * @swagger
 * /blog/{id}:
 *   delete:
 *     summary: Delete   the .Blog
 *     tags: [Blog]
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       desciption: mongo Id required
 *       schema:
 *          type: string
 *     responses:
 *       200:
 *        description: blog deleted sucessfully
 *       400:
 *        description: No blog exists 
 *       500:
 *        description: internal server Error
*/

router.delete('/blog/:id',deleteBlog)
/**
 * @swagger
 * /blog/changeimage/{id}:
 *   put:
 *     summary: change  the image of the Blog.
 *     tags: [Blog]
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
 *        description: vlog info with message vlog created sucessfully
 *       400:
 *        description: type error 
 *       500:
 *        description: internal server Error
 *
 * 
 *           
 * 
*/

router.put('/blog/changeimage/:id',upload.single('image'),deleteBlog)


export default router 