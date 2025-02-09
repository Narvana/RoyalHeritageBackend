const express=require('express')

const router=express.Router();

const {BannerUpload,ViewBanner,RemoveBanner}=require('../controller/Banner.controller');
const upload=require('../middleware/ImageUpload/imageUploadMiddleware');
const {verify} = require('../middleware/verifyToken');

/**
 * @swagger
 * /api/banner/Add/Image:
 *   post:
 *     summary: Upload a Banner Image
 *     description: Uploads a banner image. If a banner image already exists, it updates the existing image.
 *     tags: [Banner]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               BannerImage:
 *                 type: string
 *                 format: binary
 *                 description: The banner image file to upload.
 *     responses:
 *       200:
 *         description: Successfully uploaded or updated the banner image.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Banner Image Updated
 *                 data:
 *                   type: object
 *                   properties:
 *                     BannerImage:
 *                       type: string
 *                       description: URL of the uploaded banner image.
 *       400:
 *         description: Bad Request - No banner image provided or invalid file type.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No Banner Image Provide
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
router.post('/Add/Image',verify,upload.single('BannerImage'),BannerUpload);

/**
 * @swagger
 * /api/banner/View/Image:
 *   get:
 *     summary: Retrieve the Banner Image
 *     description: Fetches the current banner image from the database.
 *     tags: [Banner]
 *     responses:
 *       200:
 *         description: Successfully retrieved the banner image.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Banner Image
 *                 data:
 *                   type: object
 *                   properties:
 *                     BannerImage:
 *                       type: string
 *                       description: URL of the banner image.
 *       400:
 *         description: Bad Request - No banner image found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No Banner Image found
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
router.get('/View/Image',ViewBanner);

/**
 * @swagger
 * /api/banner/Delete/Image:
 *   delete:
 *     summary: Remove a Banner Image
 *     description: Deletes a banner image from the database using the provided image ID.
 *     tags: [Banner]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: The ID of the banner image to be deleted.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully removed the banner image.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Banner Image Removed
 *       400:
 *         description: Bad Request - No ID provided or no image found with the provided ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Please Provide ID
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
router.delete("/Delete/Image",verify,RemoveBanner);

module.exports=router