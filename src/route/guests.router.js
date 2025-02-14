const express=require('express');
const router= express.Router();

const {AddGuest,getGuest, updateGuest, deleteGuest}=require('../controller/guests.controller');

const upload=require('../middleware/ImageUpload/imageUploadMiddleware');

const {verify}= require('../middleware/verifyToken');


/**
 * @swagger
 * /api/Guest/Add:
 *   post:
 *     summary: Add a new guest
 *     description: Adds a new guest to the system with an optional image. Requires authentication.
 *     tags:
 *       - Guests
 *     security:
 *       - bearerAuth: []  # Indicates that this endpoint requires bearer token authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               guestName:
 *                 type: string
 *                 description: The name of the guest.
 *                 example: "John Doe"
 *               aboutGuest:
 *                 type: string
 *                 description: A brief description about the guest.
 *                 example: "A frequent traveler and adventure enthusiast."
 *     responses:
 *       200:
 *         description: Guest added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The unique identifier for the guest.
 *                     guestName:
 *                       type: string
 *                     aboutGuest:
 *                       type: string
 *                     guestImage:
 *                       type: string
 *                       description: The URL of the uploaded guest image.
 *                 message:
 *                   type: string
 *                   example: "Guest is added"
 *       400:
 *         description: Bad Request - No image provided or invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "No Image Provided of guest"
 *       401:
 *         description: Unauthorized - Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Unauthorized User, No Token Found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error: [error message]"
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
router.post('/Add',verify,upload.single('guestImage'),AddGuest);

/**
 * @swagger
 * /api/Guest/Get:
 *   get:
 *     summary: Retrieve a list of guests
 *     description: Fetches all guests from the system. Returns an error if the guest list is empty.
 *     tags:
 *       - Guests
 *     responses:
 *       200:
 *         description: Successfully retrieved the guest list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The unique identifier for the guest.
 *                       guestName:
 *                         type: string
 *                         description: The name of the guest.
 *                       aboutGuest:
 *                         type: string
 *                         description: A brief description about the guest.
 *                       guestImage:
 *                         type: string
 *                         description: The URL of the uploaded guest image.
 *                 message:
 *                   type: string
 *                   example: "Guest List. Count-: 5"
 *       400:
 *         description: Bad Request - Guest list is empty
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Guest List is empty please add some guest"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error: [error message]"
 */
router.get('/Get',getGuest);

/**
 * @swagger
 * /api/Guest/Update:
 *   put:
 *     summary: Update guest information
 *     description: Updates the information of an existing guest. Requires authentication and an optional image upload.
 *     tags:
 *       - Guests
 *     security:
 *       - bearerAuth: []  # Indicates that this endpoint requires bearer token authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               guestName:
 *                 type: string
 *                 description: The name of the guest.
 *                 example: "John Doe"
 *               aboutGuest:
 *                 type: string
 *                 description: A brief description about the guest.
 *                 example: "A frequent traveler and adventure enthusiast."
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: The unique identifier of the guest to be updated.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Guest updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The unique identifier for the guest.
 *                     guestName:
 *                       type: string
 *                     aboutGuest:
 *                       type: string
 *                     guestImage:
 *                       type: string
 *                       description: The URL of the uploaded guest image.
 *                 message:
 *                   type: string
 *                   example: "Guest is updated"
 *       400:
 *         description: Bad Request - No input field provided or invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "No input field provided, nothing to update"
 *       401:
 *         description: Unauthorized - Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Unauthorized User, No Token Found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error: [error message]"
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
router.put('/Update',verify,upload.single('guestImage'),updateGuest);

/**
 * @swagger
 * /api/Guest/Delete:
 *   delete:
 *     summary: Delete a guest
 *     description: Deletes a guest from the system using their unique identifier. Requires authentication.
 *     tags:
 *       - Guests
 *     security:
 *       - bearerAuth: []  # Indicates that this endpoint requires bearer token authentication
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: The unique identifier of the guest to be deleted.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Guest deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items: {}
 *                 message:
 *                   type: string
 *                   example: "Guest is Removed"
 *       400:
 *         description: Bad Request - Invalid guest ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Invalid guest ID"
 *       401:
 *         description: Unauthorized - Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Unauthorized User, No Token Found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error: [error message]"
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
router.delete('/Delete',verify,deleteGuest);

module.exports=router;
