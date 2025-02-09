const express=require('express')

const router=express.Router();

const { AddEventEnquiry, GetEventEnquiry, removeEvent}=require('../controller/EventEnquiry.Controller');

const {verify} = require('../middleware/verifyToken');

/**
 * @swagger
 * /api/Event/Enquiry/Add:
 *   post:
 *     summary: Add an Event Enquiry
 *     description: Submits an enquiry for an event with the provided details.
 *     tags: [Event Enquiry]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               EnquiryName:
 *                 type: string
 *                 description: Name of the person making the enquiry.
 *                 example: John Doe
 *               EnquiryContact:
 *                 type: string
 *                 description: Contact number of the person making the enquiry.
 *                 example: +1234567890
 *               EnquiryEmail:
 *                 type: string
 *                 description: Email address of the person making the enquiry.
 *                 example: johndoe@example.com
 *               EnquiryMessage:
 *                 type: string
 *                 description: Message or details of the enquiry.
 *                 example: I would like to know more about the event.
 *               eventType:
 *                 type: string
 *                 description: Type of the event.
 *                 example: Wedding
 *               eventDate:
 *                 type: string
 *                 format: date
 *                 description: Date of the event.
 *                 example: 2023-12-25
 *               guestNo:
 *                 type: integer
 *                 description: Number of guests expected.
 *                 example: 50
 *     responses:
 *       200:
 *         description: Successfully added the event enquiry.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Event Enquiry Added
 *                 data:
 *                   type: object
 *                   properties:
 *                     EnquiryName:
 *                       type: string
 *                     EnquiryContact:
 *                       type: string
 *                     EnquiryEmail:
 *                       type: string
 *                     EnquiryMessage:
 *                       type: string
 *                     eventType:
 *                       type: string
 *                     eventDate:
 *                       type: string
 *                     guestNo:
 *                       type: integer
 *       400:
 *         description: Bad Request - Event enquiry not added due to some issue.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Event Enquiry Not Added. Some issue might occur
 *       500:
 *         description: Internal Server Error - An error occurred while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error <error message>
 */
router.post('/Add',AddEventEnquiry);

/**
 * @swagger
 * /api/Event/Enquiry/List:
 *   get:
 *     summary: Retrieve a list of Event Enquiries
 *     description: Fetches all event enquiries from the database.
 *     tags: [Event Enquiry]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of event enquiries.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Event Enquiry List
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       EnquiryName:
 *                         type: string
 *                         example: John Doe
 *                       EnquiryContact:
 *                         type: string
 *                         example: +1234567890
 *                       EnquiryEmail:
 *                         type: string
 *                         example: johndoe@example.com
 *                       EnquiryMessage:
 *                         type: string
 *                         example: I would like to know more about the event.
 *                       eventType:
 *                         type: string
 *                         example: Wedding
 *                       eventDate:
 *                         type: string
 *                         format: date
 *                         example: 2023-12-25
 *                       guestNo:
 *                         type: integer
 *                         example: 50
 *       400:
 *         description: Bad Request - No event enquiries found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No Event Enquiry
 *       500:
 *         description: Internal Server Error - An error occurred while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error <error message>
 */
router.get('/List',verify,GetEventEnquiry);

/**
 * @swagger
 * /api/Event/Enquiry/Delete:
 *   delete:
 *     summary: Remove an Event Enquiry
 *     description: Deletes an event enquiry from the database using the provided event ID.
 *     tags: [Event Enquiry]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: The ID of the event enquiry to be deleted.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully removed the event enquiry.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Event Enquiry Removed
 *       400:
 *         description: Bad Request - No ID provided or no event enquiry found with the provided ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Please provide Event id for enquiry
 *       500:
 *         description: Internal Server Error - An error occurred while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error <error message>
 */
router.delete("/Delete",verify,removeEvent);

module.exports=router