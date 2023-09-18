const express = require("express");
const {
  getPlaces,
  getPlace,
  createPlace,
  updatePlace,
  deletePlace,
  getPlaceByUser,
  getPlacesInRadius,
} = require("../controller/places");

const Place = require("../models/Place");
const advancedResults = require("../middleware/advancedResults");

//Include children routes
const reviewRouter = require("./reviews");
const router = express.Router();

const { protect } = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   name: Places
 *   description: API to manage places
 */

/**
 * @swagger
 * /api/places:
 *   get:
 *     summary: Get all places
 *     tags: [Places]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: averageRating[gte]
 *         schema:
 *           type: number
 *         description: Minimum average rating (Optional)
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Place category (Optional)
 *       - in: query
 *         name: totalreviews[gte]
 *         schema:
 *           type: integer
 *         description: Minimum total reviews (Optional)
 *     responses:
 *       '200':
 *         description: Successfully retrieved places
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 15
 *                 pagination:
 *                   type: object
 *                   properties: {} # You can define pagination properties here
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       location:
 *                         type: object
 *                         properties:
 *                           type:
 *                             type: string
 *                             example: Point
 *                           coordinates:
 *                             type: array
 *                             items:
 *                               type: number
 *                               example: [91.9187031, 25.0141875]
 *                           formattedAddress:
 *                             type: string
 *                             example: "2W79+MFG Ratargul Swamp Forest, Gushainpur, Bangladesh"
 *                           city:
 *                             type: string
 *                             example: Gushainpur
 *                           country:
 *                             type: string
 *                             example: BD
 *                       _id:
 *                         type: string
 *                         example: "63660c447667bad8067297f9"
 *                       name:
 *                         type: string
 *                         example: "Ratargul Swamp Forest"
 *                       category:
 *                         type: string
 *                         example: "tourist"
 *                       address:
 *                         type: string
 *                         example: "Ratargul Swamp forest, sylhet"
 *                       photo:
 *                         type: string
 *                         example: "http://res.cloudinary.com/adoptapaw/image/upload/v1667632193/ftu00r3xi3zflx0ki7we.jpg"
 *                       user:
 *                         type: string
 *                         example: "6366070d7667bad8067295ef"
 *                       totalreviews:
 *                         type: integer
 *                         example: 0
 *                       createdAt:
 *                         type: string
 *                         example: "2022-11-05T07:09:56.024Z"
 *                       __v:
 *                         type: integer
 *                         example: 0
 *                       averageRating:
 *                         type: number
 *                         example: 4.5
 *       '401':
 *         description: Unauthorized - Invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 */

/**
 * @swagger
 * /api/places/{id}:
 *   get:
 *     summary: Get place by ID
 *     tags: [Places]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the place to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved the place by ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     location:
 *                       type: object
 *                       properties:
 *                         type:
 *                           type: string
 *                           example: Point
 *                         coordinates:
 *                           type: array
 *                           items:
 *                             type: number
 *                           example: [91.9187031, 25.0141875]
 *                         formattedAddress:
 *                           type: string
 *                           example: "2W79+MFG Ratargul Swamp Forest, Gushainpur, Bangladesh"
 *                         city:
 *                           type: string
 *                           example: Gushainpur
 *                         country:
 *                           type: string
 *                           example: BD
 *                     _id:
 *                       type: string
 *                       example: "63660c447667bad8067297f9"
 *                     name:
 *                       type: string
 *                       example: "Ratargul Swamp Forest"
 *                     category:
 *                       type: string
 *                       example: "tourist"
 *                     address:
 *                       type: string
 *                       example: "Ratargul Swamp forest, sylhet"
 *                     photo:
 *                       type: string
 *                       example: "http://res.cloudinary.com/adoptapaw/image/upload/v1667632193/ftu00r3xi3zflx0ki7we.jpg"
 *                     user:
 *                       type: string
 *                       example: "6366070d7667bad8067295ef"
 *                     totalreviews:
 *                       type: number
 *                       example: 0
 *                     createdAt:
 *                       type: string
 *                       example: "2022-11-05T07:09:56.024Z"
 *                     __v:
 *                       type: number
 *                       example: 0
 *                     averageRating:
 *                       type: number
 *                       example: 4.5
 *       '404':
 *         description: Place not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Place not found
 */
/**
 * @swagger
 * /api/places:
 *   post:
 *     summary: Create a new place
 *     tags: [Places]
 *     requestBody:
 *       description: Place creation data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "University of Dhaka"
 *               category:
 *                 type: string
 *                 example: "educational"
 *               address:
 *                 type: string
 *                 example: "Dhaka University, Dhaka"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '201':
 *         description: Place created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       '400':
 *         description: Bad request - Invalid or missing data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Invalid data
 */

/**
 * @swagger
 * /api/places/{id}:
 *   put:
 *     summary: Update a place by ID
 *     tags: [Places]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the place to update
 *     requestBody:
 *       description: Place data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               address:
 *                 type: string
 *             example:
 *               name: Dominos Pizza Dhanmondi
 *               description: Dominos Pizza is situated in Dhanmondi which is a place of good environment, foods are lovely. It is a place where you can hang out with your friends
 *               address: Rangs Fortune Square, Ground & First Floor, House/ Plot no #32 Rd 02 ঢাকা, 1205
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Place updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     location:
 *                       type: object
 *                       properties:
 *                         type:
 *                           type: string
 *                         coordinates:
 *                           type: array
 *                           items:
 *                             type: number
 *                         formattedAddress:
 *                           type: string
 *                         country:
 *                           type: string
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     category:
 *                       type: string
 *                     address:
 *                       type: string
 *                     photo:
 *                       type: string
 *                     user:
 *                       type: string
 *                     totalreviews:
 *                       type: number
 *                     createdAt:
 *                       type: string
 *                     __v:
 *                       type: number
 *                     averageRating:
 *                       type: number
 *                 message:
 *                   type: string
 *                   example: Place updated successfully
 */
/**
 * @swagger
 * /api/places/{id}:
 *   delete:
 *     summary: Delete a place by ID
 *     tags: [Places]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the place to delete
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Place deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Place deleted successfully
 *       '401':
 *         description: Unauthorized - User is not authorized to delete this place
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: User is not authorized to delete this place
 */
/**
 * @swagger
 * /api/places/user/all:
 *   get:
 *     summary: Get places by user
 *     tags: [Places]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of places found for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 7
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       location:
 *                         type: object
 *                         properties:
 *                           type:
 *                             type: string
 *                             example: Point
 *                           coordinates:
 *                             type: array
 *                             items:
 *                               type: number
 *                             example: [92.3233948, 20.6237016]
 *                           formattedAddress:
 *                             type: string
 *                             example: Saint Martins Island, Bangladesh
 *                           country:
 *                             type: string
 *                             example: BD
 *                       _id:
 *                         type: string
 *                         example: 63660adf7667bad80672975c
 *                       name:
 *                         type: string
 *                         example: Saint Martins
 *                       category:
 *                         type: string
 *                         example: tourist
 *                       address:
 *                         type: string
 *                         example: Saint Martins Island, Bangladesh
 *                       photo:
 *                         type: string
 *                         example: http://res.cloudinary.com/adoptapaw/image/upload/v1667631836/vupzawv014tlzkjbnnza.jpg
 *                       user:
 *                         type: string
 *                         example: 636606d57667bad8067295dd
 *                       totalreviews:
 *                         type: integer
 *                         example: 0
 *                       createdAt:
 *                         type: string
 *                         example: 2022-11-05T07:03:59.380Z
 *                       __v:
 *                         type: integer
 *                         example: 0
 *                       averageRating:
 *                         type: number
 *                         example: 4
 *       '401':
 *         description: Unauthorized - Bearer token is missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 */

router.use("/:placeId/reviews", reviewRouter);

router.route("/radius/:zipcode/:distance").get(getPlacesInRadius);
router
  .route("/")
  .get(protect, advancedResults(Place), getPlaces)
  .post(protect, createPlace);

//Routes protected
router
  .route("/:id")
  .get(protect, getPlace)
  .put(protect, updatePlace)
  .delete(protect, deletePlace);

router.route("/user/all").get(protect, getPlaceByUser);
module.exports = router;
