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
 * path:
 *   /api/places:
 *     get:
 *       summary: Get all places
 *       tags: [Places]
 *       security:
 *         - BearerAuth: []
 *       responses:
 *         '200':
 *           description: A list of places
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   count:
 *                     type: integer
 *                     example: 15
 *                   pagination: {}
 *                   data:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         location:
 *                           type: object
 *                           properties:
 *                             type:
 *                               type: string
 *                               example: "Point"
 *                             coordinates:
 *                               type: array
 *                               example: [91.9187031, 25.0141875]
 *                             formattedAddress:
 *                               type: string
 *                               example: "2W79+MFG Ratargul Swamp Forest, Gushainpur, Bangladesh"
 *                             city:
 *                               type: string
 *                               example: "Gushainpur"
 *                             country:
 *                               type: string
 *                               example: "BD"
 *                         _id:
 *                           type: string
 *                           example: "63660c447667bad8067297f9"
 *                         name:
 *                           type: string
 *                           example: "Ratargul Swamp Forest"
 *                         category:
 *                           type: string
 *                           example: "tourist"
 *                         address:
 *                           type: string
 *                           example: "Ratargul Swamp forest, sylhet"
 *                         photo:
 *                           type: string
 *                           example: "http://res.cloudinary.com/adoptapaw/image/upload/v1667632193/ftu00r3xi3zflx0ki7we.jpg"
 *                         user:
 *                           type: string
 *                           example: "6366070d7667bad8067295ef"
 *                         totalreviews:
 *                           type: integer
 *                           example: 0
 *                         createdAt:
 *                           type: string
 *                           example: "2022-11-05T07:09:56.024Z"
 *                         __v:
 *                           type: integer
 *                           example: 0
 *                         averageRating:
 *                           type: number
 *                           example: 4.5
 *       securitySchemes:
 *         BearerAuth:
 *           type: http
 *           scheme: bearer
 *           bearerFormat: JWT
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
