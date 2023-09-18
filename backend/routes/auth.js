const express = require("express");
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword,
  // addLocation,
  // addPreference,
} = require("../controller/auth");
const {
  getNotifications,
  readNotifications,
  getNotificationAlerts,
} = require("../controller/notifications");
const router = express.Router();
const { protect } = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API to manage users
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       description: User registration data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               address:
 *                 type: string
 *               preference:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *               - address
 *               - preference
 *     responses:
 *       '201':
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
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
 * /api/auth/login:
 *   post:
 *     summary: Login as a user
 *     tags: [Authentication]
 *     requestBody:
 *       description: User login data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *       '401':
 *         description: Unauthorized - Invalid credentials
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
 * /api/auth/me:
 *   get:
 *     summary: Get Current User
 *     description: Retrieve information about the authenticated user.
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []  # Bearer token authentication
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 location:
 *                   type: Point
 *                   coordinates: [90.3689508, 23.7554073]
 *                   formattedAddress: Lalmatia, Dhaka, Bangladesh
 *                   city: Dhaka
 *                   country: BD
 *                 _id: 636606d57667bad8067295dd
 *                 name: Fahmida Ara
 *                 email: xyz@gmail.com
 *                 role: user
 *                 photo: http://res.cloudinary.com/adoptapaw/image/upload/v1667630824/ytg6pfdbxjjutzyztiir.jpg
 *                 address: Lalmatia, Dhaka
 *                 preferredCategory:
 *                   - Restaurant
 *                   - Establishment
 *                   - Tourist
 *                 notification:
 *                   - username: Shahriar Rumel
 *                     userphoto: http://res.cloudinary.com/adoptapaw/image/upload/v1667631013/pfpyyi2o9jnykt1yzy8t.jpg
 *                     place: 63660c447667bad8067297f9
 *                     placename: Ratargul Swamp Forest
 *                     reviewid: 63660d217667bad80672983a
 *                     read: true
 *                     _id: 63660e107667bad80672992c
 *                     createdAt: "2022-11-05T07:17:36.902Z"
 *                   - username: Shahriar Rumel
 *                     userphoto: http://res.cloudinary.com/adoptapaw/image/upload/v1667631013/pfpyyi2o9jnykt1yzy8t.jpg
 *                     place: 636608b47667bad806729662
 *                     placename: Sairu Hill Resort
 *                     reviewid: 63660e5a7667bad80672995f
 *                     read: false
 *                     _id: 63660e8f7667bad8067299b2
 *                     createdAt: "2022-11-05T07:19:43.346Z"
 *                 createdAt: "2022-11-05T06:46:45.948Z"
 *                 __v: 7
 */

/**
 * @swagger
 * /api/auth/forgotpassword:
 *   post:
 *     summary: Request a password reset
 *     description: Request a password reset for the authenticated user.
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []  # Bearer token authentication
 *     responses:
 *       '200':
 *         description: Password reset email sent successfully
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
 *                   example: Password reset email sent.
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
 * /api/auth/resetpassword/{resetToken}:
 *   put:
 *     summary: Reset Password
 *     description: Reset the password using the provided reset token.
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: resetToken
 *         required: true
 *         description: The unique reset token received via email.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []  # Bearer token authentication
 *     requestBody:
 *       description: New password data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *             required:
 *               - newPassword
 *               - confirmPassword
 *     responses:
 *       '200':
 *         description: Password reset successful
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
 *                   example: Password reset successful.
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
 *       '401':
 *         description: Unauthorized - Token is invalid or expired
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
 *                   example: Unauthorized access
 */
/**
 * @swagger
 * /api/auth/updatedetails:
 *   put:
 *     summary: Update User Details
 *     description: Update user details for the authenticated user.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Bearer token authentication
 *     requestBody:
 *       description: User details to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       '200':
 *         description: User details updated successfully
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
 *                   example: User details updated successfully.
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
 *       '401':
 *         description: Unauthorized - Token is invalid or expired
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
 *                   example: Unauthorized access
 */
/**
 * @swagger
 * /api/auth/addlocation:
 *   post:
 *     summary: Add user location
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *                 example: Uttara
 *     responses:
 *       '200':
 *         description: Location added successfully
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
 *                     message:
 *                       type: string
 *                       example: Location added successfully
 *       '400':
 *         description: Bad request - Invalid input
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
 *                   example: Bad request
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
 *   name: Notifications
 *   description: API endpoints for user notifications
 */

/**
 * @swagger
 * /api/auth/notifications:
 *   get:
 *     summary: Get notifications for a user
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of notifications for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       username:
 *                         type: string
 *                         example: "Shahriar Rumel"
 *                       userphoto:
 *                         type: string
 *                         example: "http://res.cloudinary.com/adoptapaw/image/upload/v1667631013/pfpyyi2o9jnykt1yzy8t.jpg"
 *                       place:
 *                         type: string
 *                         example: "63660c447667bad8067297f9"
 *                       placename:
 *                         type: string
 *                         example: "Ratargul Swamp Forest"
 *                       reviewid:
 *                         type: string
 *                         example: "63660d217667bad80672983a"
 *                       read:
 *                         type: boolean
 *                         example: true
 *                       _id:
 *                         type: string
 *                         example: "63660e107667bad80672992c"
 *                       createdAt:
 *                         type: string
 *                         example: "2022-11-05T07:17:36.902Z"
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
 *   name: Notifications
 *   description: API endpoints for user notifications
 */

/**
 * @swagger
 * /api/auth/{notificationId}/markasread:
 *   post:
 *     summary: Mark a notification as read for a user
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the notification to mark as read
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Notification marked as read successfully
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
 *                           example: "Point"
 *                         coordinates:
 *                           type: array
 *                           items:
 *                             type: number
 *                           example: [90.3689508, 23.7554073]
 *                         formattedAddress:
 *                           type: string
 *                           example: "Lalmatia, Dhaka, Bangladesh"
 *                         city:
 *                           type: string
 *                           example: "Dhaka"
 *                         country:
 *                           type: string
 *                           example: "BD"
 *                     _id:
 *                       type: string
 *                       example: "636606d57667bad8067295dd"
 *                     name:
 *                       type: string
 *                       example: "Fahmida Ara"
 *                     email:
 *                       type: string
 *                       example: "xyz@gmail.com"
 *                     role:
 *                       type: string
 *                       example: "user"
 *                     photo:
 *                       type: string
 *                       example: "http://res.cloudinary.com/adoptapaw/image/upload/v1667630824/ytg6pfdbxjjutzyztiir.jpg"
 *                     address:
 *                       type: string
 *                       example: "Lalmatia, Dhaka"
 *                     preferredCategory:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Restaurant", "Establishment", "Tourist"]
 *                     notification:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           username:
 *                             type: string
 *                             example: "Shahriar Rumel"
 *                           userphoto:
 *                             type: string
 *                             example: "http://res.cloudinary.com/adoptapaw/image/upload/v1667631013/pfpyyi2o9jnykt1yzy8t.jpg"
 *                           place:
 *                             type: string
 *                             example: "63660c447667bad8067297f9"
 *                           placename:
 *                             type: string
 *                             example: "Ratargul Swamp Forest"
 *                           reviewid:
 *                             type: string
 *                             example: "63660d217667bad80672983a"
 *                           read:
 *                             type: boolean
 *                             example: true
 *                           _id:
 *                             type: string
 *                             example: "63660e107667bad80672992c"
 *                           createdAt:
 *                             type: string
 *                             example: "2022-11-05T07:17:36.902Z"
 *                     createdAt:
 *                       type: string
 *                       example: "2022-11-05T06:46:45.948Z"
 *                     __v:
 *                       type: integer
 *                       example: 7
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

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", protect, resetPassword);
router.put("/updatedetails", protect, updateDetails);
// router.post("/addlocation", protect, addLocation);
// router.post("/addpreference", protect, addPreference);
router.put("/updatepassword", protect, updatePassword);
router.get("/notifications", protect, getNotifications);
router.post("/:id/markasread", protect, readNotifications);
router.get("/notifications/notificationalert", protect, getNotificationAlerts);

module.exports = router;
