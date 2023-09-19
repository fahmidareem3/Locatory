const express = require("express");
const { getLikes, addLike, getLikeByUser } = require("../controller/likes");

const Like = require("../models/Like");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");

const { protect } = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: API endpoints for reviews
 */

/**
 * @swagger
 * /api/reviews/{reviewId}/likes:
 *   post:
 *     summary: Add or remove a like on a review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the review to like/unlike
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Like added or removed successfully
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
 *                     likecount:
 *                       type: integer
 *                       example: 1
 *                     review:
 *                       type: string
 *                       example: "63660e5a7667bad80672995f"
 *                     user:
 *                       type: string
 *                       example: "636606d57667bad8067295dd"
 *                     reviewtitle:
 *                       type: string
 *                       example: "Wonderful Resort"
 *                     reviewdescription:
 *                       type: string
 *                       example: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
 *                     reviewImage:
 *                       type: string
 *                       example: "http://res.cloudinary.com/adoptapaw/image/upload/v1667632728/sfdmiz7bgjvwofgmixez.jpg"
 *                     _id:
 *                       type: string
 *                       example: "6508cbf91e1038f83304332b"
 *                     createdAt:
 *                       type: string
 *                       example: "2023-09-18T22:15:21.417Z"
 *                     __v:
 *                       type: integer
 *                       example: 0
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
 *   name: Likes
 *   description: API endpoints for liked reviews
 */

/**
 * @swagger
 * /api/likes/user/all:
 *   get:
 *     summary: Get all liked reviews for a user
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of liked reviews for the user
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
 *                   example: 6
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "63660df97667bad8067298ed"
 *                       likecount:
 *                         type: integer
 *                         example: 1
 *                       review:
 *                         type: string
 *                         example: "63660dd27667bad8067298be"
 *                       user:
 *                         type: string
 *                         example: "636606d57667bad8067295dd"
 *                       reviewtitle:
 *                         type: string
 *                         example: "I like the movies here"
 *                       reviewdescription:
 *                         type: string
 *                         example: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
 *                       reviewImage:
 *                         type: string
 *                         example: "http://res.cloudinary.com/adoptapaw/image/upload/v1667632592/ndhbjsnrz4glns986die.jpg"
 *                       createdAt:
 *                         type: string
 *                         example: "2022-11-05T07:17:13.436Z"
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
 *                   example: "Unauthorized"
 */

router
  .route("/")
  .get(
    protect,
    advancedResults(Like, {
      path: "review",
      select: "title",
    }),
    getLikes
  )
  .post(protect, addLike);

router.route("/user/all").get(protect, getLikeByUser);

module.exports = router;
