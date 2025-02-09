const express=require('express')

const router=express.Router();

const {AboutImgUpload,ViewAboutImg,RemoveAboutImg}=require('../controller/About.controller')

const upload=require('../middleware/ImageUpload/imageUploadMiddleware');
const {verify} = require('../middleware/verifyToken');

/**
 * @swagger
 * /api/about/Add/Image:
 *   post:
 *     summary: Upload an About Image
 *     description: Uploads an image for the About section. If an image already exists, it updates the existing image.
 *     tags: [About]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               AboutImage:
 *                 type: string
 *                 format: binary
 *                 description: The image file to upload.
 *     responses:
 *       200:
 *         description: Successfully uploaded or updated the About image.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     AboutImage:
 *                       type: string
 *                       description: URL of the uploaded image.
 *       400:
 *         description: Bad Request - No image provided or invalid file type.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal Server Error - An error occurred while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('/Add/Image',verify,upload.single('AboutImage'),AboutImgUpload);

/**
 * @swagger
 * /api/about/View/Image:
 *   get:
 *     summary: Retrieve the About Image
 *     description: Fetches the current About image from the database.
 *     tags: [About]
 *     responses:
 *       200:
 *         description: Successfully retrieved the About image.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: About Image
 *                 data:
 *                   type: object
 *                   properties:
 *                     AboutImage:
 *                       type: string
 *                       description: URL of the About image.
 *       400:
 *         description: Bad Request - No About image found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No About Image found
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
router.get('/View/Image',ViewAboutImg);

/**
 * @swagger
 * /api/about/Delete/Image:
 *   delete:
 *     summary: Remove an About Image
 *     description: Deletes an About image from the database using the provided image ID.
 *     tags: [About]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: The ID of the image to be deleted.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully removed the About image.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: About Image Removed
 *       400:
 *         description: Bad Request - No image ID provided or no image found with the provided ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Please Provide image ID
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
router.delete("/Delete/Image",verify,RemoveAboutImg);

module.exports=router;