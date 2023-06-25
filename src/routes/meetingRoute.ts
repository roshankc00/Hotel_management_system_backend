import express from 'express'
import { createMeeting, deleteMeeting, getAllMeetings, getSingleMeeting, updateMeeting } from '../controllers/meetingController'
import { checkAuth, checkRole } from '../middlewares/authmiddleware'
const router=express.Router()

/**
 * @swagger
 * /meeting:
 *   post:
 *     summary: Register the Metting.
 *     tags: [Meeting]
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *            title:
 *             type: string
 *            description:
 *             type: string
 *            venue:
 *             type: string 
 *          example:
 *              title: motivation
 *              description: help to uplift the status of company
 *              venue: Hotel laxmu
 *     responses:
 *       200:
 *        description: metting created sucessfully
 *       400:
 *        description: type error 
 *       500:
 *        description: internal server Error
 *
 * 
 *           
 * 
*/

router.post('/meeting',checkAuth,checkRole('admin'),createMeeting)

/**
 * @swagger
 * /meeting/{id}:
 *   get:
 *     summary: get a single the meeting.
 *     tags: [Meeting]
  *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       desciption: mongo Id required
 *       schema:
 *          type: string
 *     responses:
 *       200:
 *        description: object of a meeting
 *       400:
 *        description: No meeting exists 
 *       500:
 *        description: internal server Error
*/


router.get('/meeting/:id',checkAuth,getSingleMeeting)
/**
 * @swagger
 * /meeting/{id}:
 *   delete:
 *     summary: delete  the .meeting
 *     tags: [Meeting]
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       desciption: mongo Id required
 *       schema:
 *          type: string
 *     responses:
 *       200:
 *        description: meeting deleted sucessfully
 *       400:
 *        description: No meeting exists 
 *       500:
 *        description: internal server Error
*/
router.delete('/meeting/:id',checkAuth,deleteMeeting)

/**
 * @swagger
 * /meeting/{id}:
 *   put:
 *     summary: update the meeting.
 *     tags: [Meeting]
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
 *            title:
 *             type: string
 *            description:
 *             type: string
 *            venue:
 *             type: string 
 *          example:
 *              title: motivation
 *              description: help to uplift the status of company
 *              venue: Hotel laxmi
 *     responses:
 *       200:
 *        description: testinomial info with  testinomial meeting message
 *       400:
 *        description: type error 
 *       500:
 *        description: internal server Error
 *
 * 
 *           
 * 
*/

router.put('/meeting/:id',checkAuth,checkRole('admin'),updateMeeting)
/**
 * @swagger
 * /meetings:
 *   get:
 *     summary: getAll the meetings.
 *     tags: [Meeting]
 *     responses:
 *       200:
 *        description: array of the meetings
 *       400:
 *        description: Noo meeting exists 
 *       500:
 *        description: internal server Error
*/
router.get('/meetings',checkAuth,getAllMeetings)



export default router 