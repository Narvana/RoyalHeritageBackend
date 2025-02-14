const express=require('express')

const router=express.Router();

const {AddRoomImage,GetRoomImage}=require('../controller/RoomImages.controller');

const upload=require('../middleware/ImageUpload/imageUploadMiddleware');

const {verify} = require('../middleware/verifyToken');

/**
 * @swagger
 * /api/Rooms/Image/Add:
 *   post:
 *     summary: Upload room images
 *     description: Upload images for different room types (Deluxe, Executive, Maharaja, Suite). This endpoint can update existing images or create new entries if no images exist.
 *     tags: [Room Images]
 *     security:
 *       - bearerAuth: []  # Indicates that this endpoint requires bearer token authentication
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               base64Deluxe:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: byte
 *                 description: An array of base64 encoded strings representing Deluxe room images.
 *               base64Executive:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: byte
 *                 description: An array of base64 encoded strings representing Executive room images.
 *               base64Maharaja:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: byte
 *                 description: An array of base64 encoded strings representing Maharaja room images.
 *               base64Suite:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: byte
 *                 description: An array of base64 encoded strings representing Suite room images.
 *               RoomImageData:
 *                 type: object
 *                 properties:
 *                   Deluxe:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: An array of existing Deluxe room image URLs.
 *                   Executive:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: An array of existing Executive room image URLs.
 *                   Maharaja:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: An array of existing Maharaja room image URLs.
 *                   Suite:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: An array of existing Suite room image URLs.
 *     responses:
 *       200:
 *         description: Images uploaded successfully or updated
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
 *                     Deluxe:
 *                       type: array
 *                       items:
 *                         type: string
 *                     Executive:
 *                       type: array
 *                       items:
 *                         type: string
 *                     Maharaja:
 *                       type: array
 *                       items:
 *                         type: string
 *                     Suite:
 *                       type: array
 *                       items:
 *                         type: string
 *                 message:
 *                   type: string
 *                   example: 'Images updated successfully'
 *       400:
 *         description: Bad Request - No images uploaded or invalid data
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
 *                   example: 'Please upload images of any Deluxe, Executive, Maharaja, or Suite'
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
  router.post('/Add', verify,upload.fields([
      { name: 'Deluxe', maxCount: 10 },
      { name: 'Executive', maxCount: 10 },
      { name: 'Maharaja', maxCount: 10 },
      { name: 'Suite', maxCount: 10 }
  ]),
  AddRoomImage
);

/**
 * @swagger
 * /api/Rooms/Image/Get:
 *   get:
 *     summary: Retrieve room images
 *     description: Get images for a specific room type (Deluxe, Executive, Maharaja, Suite) or all room images.
 *     tags: [Room Images]
 *     parameters:
 *       - in: query
 *         name: type
 *         required: false
 *         description: The type of room images to retrieve (Deluxe, Executive, Maharaja, Suite).
 *         schema:
 *           type: string
 *           enum: [Deluxe, Executive, Maharaja, Suite]
 *     responses:
 *       200:
 *         description: Successfully retrieved room images
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 data:
 *                   type: object
 *                   properties:
 *                     Deluxe:
 *                       type: array
 *                       items:
 *                         type: string
 *                     Executive:
 *                       type: array
 *                       items:
 *                         type: string
 *                     Maharaja:
 *                       type: array
 *                       items:
 *                         type: string
 *                     Suite:
 *                       type: array
 *                       items:
 *                         type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad Request - No Room Images found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 */
router.get('/Get',GetRoomImage);

module.exports=router;