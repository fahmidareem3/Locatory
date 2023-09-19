const express = require("express");
const {
  getReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview,
  getReviewByUser,
} = require("../controller/reviews");

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: API endpoints for reviews
 */

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Get reviews
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved reviews
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
 *                   example: 10
 *                 pagination:
 *                   type: object
 *                   properties: {} # You can define pagination properties here
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "636611f57667bad806729fc8"
 *                       title:
 *                         type: string
 *                         example: "Best Place To Visit"
 *                       description:
 *                         type: string
 *                         example: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
 *                       averagebudget:
 *                         type: number
 *                         example: 1000
 *                       accessibility:
 *                         type: number
 *                         example: 4
 *                       decoration:
 *                         type: number
 *                         example: 4
 *                       service:
 *                         type: number
 *                         example: 5
 *                       familyfriendly:
 *                         type: number
 *                         example: 5
 *                       transportation:
 *                         type: string
 *                         example: "bus"
 *                       setting:
 *                         type: string
 *                         example: "outdoor"
 *                       rating:
 *                         type: number
 *                         example: 5
 *                       photo:
 *                         type: string
 *                         example: "http://res.cloudinary.com/adoptapaw/image/upload/v1667633649/jvcp4marpuxylbpxqwiw.jpg"
 *                       place:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "636609e87667bad806729707"
 *                           name:
 *                             type: string
 *                             example: "Sundarbans"
 *                       user:
 *                         type: string
 *                         example: "6366070d7667bad8067295ef"
 *                       username:
 *                         type: string
 *                         example: "Shahriar Rumel"
 *                       userphoto:
 *                         type: string
 *                         example: "http://res.cloudinary.com/adoptapaw/image/upload/v1667631013/pfpyyi2o9jnykt1yzy8t.jpg"
 *                       totallikes:
 *                         type: integer
 *                         example: 2
 *                       totaldislikes:
 *                         type: integer
 *                         example: 1
 *                       createdAt:
 *                         type: string
 *                         example: "2022-11-05T07:34:13.379Z"
 *                       __v:
 *                         type: integer
 *                         example: 0
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
 * tags:
 *   name: Reviews
 *   description: API endpoints for reviews
 */

/**
 * @swagger
 * /api/places/{placeId}/reviews:
 *   get:
 *     summary: Get reviews for a place
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: placeId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the place to retrieve reviews for
 *     responses:
 *       '200':
 *         description: Successfully retrieved reviews for the place
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
 *                   example: 1
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "63660d7d7667bad80672987e"
 *                       title:
 *                         type: string
 *                         example: "Average Pizza"
 *                       description:
 *                         type: string
 *                         example: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
 *                       averagebudget:
 *                         type: number
 *                         example: 1000
 *                       accessibility:
 *                         type: number
 *                         example: 4
 *                       decoration:
 *                         type: number
 *                         example: 4
 *                       service:
 *                         type: number
 *                         example: 4
 *                       familyfriendly:
 *                         type: number
 *                         example: 2
 *                       transportation:
 *                         type: string
 *                         example: "car"
 *                       setting:
 *                         type: string
 *                         example: "indoor"
 *                       rating:
 *                         type: number
 *                         example: 2
 *                       photo:
 *                         type: string
 *                         example: "http://res.cloudinary.com/adoptapaw/image/upload/v1667632506/a7sj3rirfhpg3ms00fdy.jpg"
 *                       place:
 *                         type: string
 *                         example: "63660c077667bad8067297e0"
 *                       user:
 *                         type: string
 *                         example: "6366070d7667bad8067295ef"
 *                       username:
 *                         type: string
 *                         example: "Shahriar Rumel"
 *                       userphoto:
 *                         type: string
 *                         example: "http://res.cloudinary.com/adoptapaw/image/upload/v1667631013/pfpyyi2o9jnykt1yzy8t.jpg"
 *                       totallikes:
 *                         type: integer
 *                         example: 1
 *                       totaldislikes:
 *                         type: integer
 *                         example: 1
 *                       createdAt:
 *                         type: string
 *                         example: "2022-11-05T07:15:09.030Z"
 *                       __v:
 *                         type: integer
 *                         example: 0
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
 *                   example: "Place not found"
 */
/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: API endpoints for reviews
 */

/**
 * @swagger
 * /api/places/{placeId}/reviews:
 *   post:
 *     summary: Create a review for a place
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: placeId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the place for which to create a review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Nice decoration"
 *               description:
 *                 type: string
 *                 example: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
 *               averagebudget:
 *                 type: integer
 *                 example: 600
 *               accessibility:
 *                 type: integer
 *                 example: 4
 *               decoration:
 *                 type: integer
 *                 example: 3
 *               service:
 *                 type: integer
 *                 example: 4
 *               familyfriendly:
 *                 type: integer
 *                 example: 5
 *               transportation:
 *                 type: string
 *                 example: "car"
 *               setting:
 *                 type: string
 *                 example: "indoor"
 *               rating:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       '201':
 *         description: Successfully created a review
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
 *                     title:
 *                       type: string
 *                       example: "Nice decoration"
 *                     description:
 *                       type: string
 *                       example: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
 *                     averagebudget:
 *                       type: integer
 *                       example: 600
 *                     accessibility:
 *                       type: integer
 *                       example: 4
 *                     decoration:
 *                       type: integer
 *                       example: 3
 *                     service:
 *                       type: integer
 *                       example: 4
 *                     familyfriendly:
 *                       type: integer
 *                       example: 5
 *                     transportation:
 *                       type: string
 *                       example: "car"
 *                     setting:
 *                       type: string
 *                       example: "indoor"
 *                     rating:
 *                       type: integer
 *                       example: 3
 *                     photo:
 *                       type: string
 *                       example: "no-photo.jpg"
 *                     place:
 *                       type: string
 *                       example: "63660c077667bad8067297e0"
 *                     user:
 *                       type: string
 *                       example: "636606d57667bad8067295dd"
 *                     username:
 *                       type: string
 *                       example: "Fahmida Ara"
 *                     userphoto:
 *                       type: string
 *                       example: "http://res.cloudinary.com/adoptapaw/image/upload/v1667630824/ytg6pfdbxjjutzyztiir.jpg"
 *                     totallikes:
 *                       type: integer
 *                       example: 1
 *                     totaldislikes:
 *                       type: integer
 *                       example: 1
 *                     _id:
 *                       type: string
 *                       example: "6508ca43900c6d6e8207c300"
 *                     createdAt:
 *                       type: string
 *                       example: "2023-09-18T22:08:03.764Z"
 *                     __v:
 *                       type: integer
 *                       example: 0
 *       '400':
 *         description: Bad request, missing or invalid data
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
 *                   example: "Bad request"
 */
/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: API endpoints for reviews
 */

/**
 * @swagger
 * /api/reviews/{reviewId}:
 *   put:
 *     summary: Update a review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the review to update
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Review Title"
 *               description:
 *                 type: string
 *                 example: "Updated review description..."
 *               averagebudget:
 *                 type: integer
 *                 example: 800
 *               accessibility:
 *                 type: integer
 *                 example: 5
 *               decoration:
 *                 type: integer
 *                 example: 4
 *               service:
 *                 type: integer
 *                 example: 4
 *               familyfriendly:
 *                 type: integer
 *                 example: 5
 *               transportation:
 *                 type: string
 *                 example: "car"
 *               setting:
 *                 type: string
 *                 example: "indoor"
 *               rating:
 *                 type: integer
 *                 example: 4
 *     responses:
 *       '200':
 *         description: Successfully updated the review
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
 *                     title:
 *                       type: string
 *                       example: "Updated Review Title"
 *                     description:
 *                       type: string
 *                       example: "Updated review description..."
 *                     averagebudget:
 *                       type: integer
 *                       example: 800
 *                     accessibility:
 *                       type: integer
 *                       example: 5
 *                     decoration:
 *                       type: integer
 *                       example: 4
 *                     service:
 *                       type: integer
 *                       example: 4
 *                     familyfriendly:
 *                       type: integer
 *                       example: 5
 *                     transportation:
 *                       type: string
 *                       example: "car"
 *                     setting:
 *                       type: string
 *                       example: "indoor"
 *                     rating:
 *                       type: integer
 *                       example: 4
 *                     photo:
 *                       type: string
 *                       example: "http://example.com/updated-photo.jpg"
 *                     place:
 *                       type: string
 *                       example: "63660c077667bad8067297e0"
 *                     user:
 *                       type: string
 *                       example: "636606d57667bad8067295dd"
 *                     username:
 *                       type: string
 *                       example: "Fahmida Ara"
 *                     userphoto:
 *                       type: string
 *                       example: "http://res.cloudinary.com/adoptapaw/image/upload/v1667630824/ytg6pfdbxjjutzyztiir.jpg"
 *                     totallikes:
 *                       type: integer
 *                       example: 1
 *                     totaldislikes:
 *                       type: integer
 *                       example: 1
 *                     _id:
 *                       type: string
 *                       example: "6508ca43900c6d6e8207c300"
 *                     createdAt:
 *                       type: string
 *                       example: "2023-09-18T22:08:03.764Z"
 *                     __v:
 *                       type: integer
 *                       example: 0
 *       '400':
 *         description: Bad request, missing or invalid data
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
 *                   example: "Bad request"
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
 *                   example: "Unauthorized"
 */
/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: API endpoints for reviews
 */

/**
 * @swagger
 * /api/reviews/{reviewId}:
 *   delete:
 *     summary: Delete a review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the review to delete
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '204':
 *         description: Review deleted successfully
 *       '404':
 *         description: Review not found
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
 *                   example: "Unauthorized"
 */
/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: API endpoints for reviews
 */

/**
 * @swagger
 * /api/reviews/{reviewId}:
 *   delete:
 *     summary: Delete a review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the review to delete
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '204':
 *         description: Review deleted successfully
 *       '404':
 *         description: Review not found
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
 *                   example: "Unauthorized"
 */
/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: API endpoints for reviews
 */

/**
 * @swagger
 * /api/reviews/{reviewId}:
 *   delete:
 *     summary: Delete a review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the review to delete
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '204':
 *         description: Review deleted successfully
 *       '404':
 *         description: Review not found
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
 *                   example: "Unauthorized"
 */

const { createNotification } = require("../controller/notifications");
const Review = require("../models/Review");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");

//Include children routes
const likeRouter = require("./likes");
const dislikeRouter = require("./dislikes");

const { protect } = require("../middleware/auth");

router.use("/:reviewId/likes", likeRouter);
router.use("/:reviewId/dislikes", dislikeRouter);

router
  .route("/")
  .get(
    protect,
    advancedResults(Review, {
      path: "place",
      select: "name",
    }),
    getReviews
  )
  .post(protect, addReview);

router
  .route("/:id")
  .get(protect, getReview)
  .put(protect, updateReview)
  .delete(protect, deleteReview);

router.route("/user/all").get(protect, getReviewByUser);
router.route("/:id/notifications").post(protect, createNotification);

module.exports = router;
