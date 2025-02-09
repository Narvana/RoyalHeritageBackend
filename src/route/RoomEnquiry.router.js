const express=require('express')

const router=express.Router();

const { AddRoomEnquiry, GetRoomEnquiry, removeRoom}=require('../controller/RoomEnquiry.Controller');

const {verify} = require('../middleware/verifyToken');

/**
 * @swagger
 * /api/Room/Enquiry/Add:
 *   post:
 *     summary: Add a Room Enquiry
 *     description: Submits an enquiry for a room with the provided details.
 *     tags: [Room Enquiry]
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
 *                 example: Jane Doe
 *               EnquiryContact:
 *                 type: string
 *                 description: Contact number of the person making the enquiry.
 *                 example: +1234567890
 *               EnquiryEmail:
 *                 type: string
 *                 description: Email address of the person making the enquiry.
 *                 example: janedoe@example.com
 *               roomType:
 *                 type: string
 *                 description: Type of room being enquired about.
 *                 example: Deluxe Suite
 *               CheckIn:
 *                 type: string
 *                 format: date
 *                 description: Check-in date for the room.
 *                 example: 2023-12-01
 *               CheckOut:
 *                 type: string
 *                 format: date
 *                 description: Check-out date for the room.
 *                 example: 2023-12-05
 *               Adult:
 *                 type: integer
 *                 description: Number of adults.
 *                 example: 2
 *               Child:
 *                 type: integer
 *                 description: Number of children.
 *                 example: 1
 *               RoomCount:
 *                 type: integer
 *                 description: Number of rooms required.
 *                 example: 1
 *     responses:
 *       200:
 *         description: Successfully added the room enquiry.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Room Enquiry Added
 *                 data:
 *                   type: object
 *                   properties:
 *                     EnquiryName:
 *                       type: string
 *                     EnquiryContact:
 *                       type: string
 *                     EnquiryEmail:
 *                       type: string
 *                     roomType:
 *                       type: string
 *                     CheckIn:
 *                       type: string
 *                     CheckOut:
 *                       type: string
 *                     Adult:
 *                       type: integer
 *                     Child:
 *                       type: integer
 *                     RoomCount:
 *                       type: integer
 *       400:
 *         description: Bad Request - Room enquiry not added due to some issue.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Room Enquiry Not Added. Some issue might occur
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
router.post('/Add',AddRoomEnquiry);

/**
 * @swagger
 * /api/Room/Enquiry/List:
 *   get:
 *     summary: Retrieve a list of Room Enquiries
 *     description: Fetches all room enquiries from the database.
 *     tags: [Room Enquiry]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of room enquiries.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Enquiry Room List
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       EnquiryName:
 *                         type: string
 *                         example: Jane Doe
 *                       EnquiryContact:
 *                         type: string
 *                         example: +1234567890
 *                       EnquiryEmail:
 *                         type: string
 *                         example: janedoe@example.com
 *                       roomType:
 *                         type: string
 *                         example: Deluxe Room
 *                       CheckIn:
 *                         type: string
 *                         format: date
 *                         example: 2023-12-01
 *                       CheckOut:
 *                         type: string
 *                         format: date
 *                         example: 2023-12-05
 *                       Adult:
 *                         type: integer
 *                         example: 2
 *                       Child:
 *                         type: integer
 *                         example: 1
 *                       RoomCount:
 *                         type: integer
 *                         example: 1
 *       400:
 *         description: Bad Request - No room enquiries found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No Room Enquiry
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
router.get('/List',verify,GetRoomEnquiry);

/**
 * @swagger
 * /api/Room/Enquiry/Delete:
 *   delete:
 *     summary: Remove a Room Enquiry
 *     description: Deletes a room enquiry from the database using the provided room ID.
 *     tags: [Room Enquiry]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: The ID of the room enquiry to be deleted.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully removed the room enquiry.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Enquiry Removed
 *       400:
 *         description: Bad Request - No ID provided or no room enquiry found with the provided ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Please provide room id for enquiry
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
router.delete("/Delete",verify,removeRoom);

module.exports=router