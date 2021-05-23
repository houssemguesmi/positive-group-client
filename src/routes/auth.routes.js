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
 *              $ref: "#/components/requestBodies/UserLoginForm"
 *
 *          application/x-www-form-urlencoded:
 *            schema:
 *              type: object
 *              properties:
 *                payload:
 *                  $ref: "#/components/requestBodies/UserLoginForm"
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
 *               $ref: "#/components/responses/UserLoginResponse"
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
 *             $ref: "#/components/requestBodies/UserSignUpForm"
 *
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               payload:
 *                 $ref: "#/components/requestBodies/UserSignUpForm"
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
 *              $ref: "#/components/requestBodies/UpdatePasswordForm"
 *
 *          application/x-www-form-urlencoded:
 *            schema:
 *              type: object
 *              properties:
 *                payload:
 *                  $ref: "#/components/requestBodies/UpdatePasswordForm"
 *            encoding:
 *              payload:
 *                contentType: application/json
 *
 *     responses:
 *
 *       "201":
 *         description: The updated User
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
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
 *                   example: Wrong old password!
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
 *                   example: Same old and new password!
 *
 *       "500":
 *         description: Error
 *
*/


/**
 * @swagger
 *   components:
 *
 *     requestBodies:
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
 *       UserLoginForm:
 *         type: object
 *         properties:
 *           email:
 *             type: string
 *           password:
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
 *     responses:
 *
 *       UserLoginResponse:
 *         type: object
 *         properties:
 *           token:
 *             type: string
 *             description: the bearer token
 *           user:
 *             description: the data of the authenticated user
 *             type:
 *               $ref: '#/components/schemas/User'
 *
 *     schemas:
 *       User:
 *         type: object
 *         properties:
 *           _id:
 *             type: string
 *           firstName:
 *             type: string
 *           lastName:
 *             type: string
 *           birthDate:
 *             type: string
 *           gender:
 *             type: string
 *           job:
 *             type: string
 *           email:
 *             type: string
 *           password:
 *             type: string
 *           isActivated:
 *             type: boolean
 *           invitees:
 *             type: array
 *           inviterCode:
 *             type: string
 *           inviterEmail:
 *             type: string
 *           bonus:
 *             type: string
 *           image:
 *             type: string
 *           phone:
 *             type: string
 *           location:
 *             type: string
*/