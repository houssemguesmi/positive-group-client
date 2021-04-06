const router = require("express").Router();
const authController = require("../controllers/auth.controller");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/update-password", authController.updatePassword)

module.exports = router;

/**
 * @swagger
 *  /login:
 *   post:
 *     tags:
 *       - authentication
 *     summary: User Authentication
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/UserLoginForm"
 *
 *          application/x-www-form-urlencoded:
 *            schema:
 *              type: object
 *              properties:
 *                payload:
 *                  $ref: "#/components/schemas/UserLoginForm"
 *            encoding:
 *              payload:
 *                contentType: application/json
 *
 *     responses:
 *       "405":
 *         description: Wrong Password
 *
 *       "400":
 *         description: Error
 *
 *       "201":
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UserLoginResponse"
*/


/**
 * @swagger
 *  /signup:
 *   post:
 *     tags:
 *       - authentication
 *     summary: Registration for new users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UserSignUpForm"
 *
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               payload:
 *                 $ref: "#/components/schemas/UserSignUpForm"
 *           encoding:
 *             payload:
 *               contentType: application/json
 *
 *     responses:
 *       "500":
 *         description: Error
 *       "200":
 *         description: Created
*/


/**
 * @swagger
 *  /update-password:
 *   post:
 *     tags:
 *       - authentication
 *     summary: Update existing password
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/UpdatePasswordForm"
 *
 *          application/x-www-form-urlencoded:
 *            schema:
 *              type: object
 *              properties:
 *                payload:
 *                  $ref: "#/components/schemas/UpdatePasswordForm"
 *            encoding:
 *              payload:
 *                contentType: application/json
 *
 *     responses:
 *
 *       "401":
 *         description: Wrong Password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *
 *       "405":
 *         description: Identical old and new passwords
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *
 *       "500":
 *         description: Error
 *
 *       "201":
 *         description: Updated User
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
*/


/**
 * @swagger
 *   components:
 *     schemas:
 *
 *       UserLoginForm:
 *         type: object
 *         properties:
 *           email:
 *             type: string
 *           password:
 *             type: string
 *
 *       UserLoginResponse:
 *         type: object
 *         properties:
 *           token:
 *             type: string
 *             description: the bearer token
 *           user:
 *             type:
 *               $ref: '#/components/schemas/User'
 *             description: the data of the authenticated user
 *
 *       UserSignUpForm:
 *         type: object
 *         properties:
 *           email:
 *             type: string
 *           password:
 *             type: string
 *           code:
 *             type: string
 *
 *       UpdatePasswordForm:
 *         type: object
 *         properties:
 *           email:
 *             type: string
 *           oldPassword:
 *             type: string
 *           newPassword:
 *             type: string
 *
 *       User:
 *         type: object
 *         properties:
 *           _id:
 *             description: id of the user
 *             type: string
 *           firstName:
 *             description: first name of the user
 *             type: string
 *           lastName:
 *             description: last name of the user
 *             type: string
 *           birthDate:
 *             description: birthdate of the user
 *             type: string
 *           gender:
 *             description: gender of the user
 *             type: string
 *           job:
 *             description: job of the user
 *             type: string
 *           email:
 *             description: email of the user
 *             type: string
 *           password:
 *             description: password of the user
 *             type: string
 *           isActivated:
 *             description: is the account activated
 *             type: boolean
 *           invitees:
 *             description: users invited by this user
 *             type: array
 *           inviter:
 *             description: the user who invited user, null if none
 *             type: string
 *           bonus:
 *             description: bonus cumulated by the user
 *             type: string
 *           image:
 *             description: image of the user
 *             type: string
 *           phone:
 *             description: phone number of the user
 *             type: string
 *           location:
 *             description: location by governorate of the user
 *             type: string
*/
