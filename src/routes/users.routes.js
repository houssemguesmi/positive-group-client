const router = require("express").Router();
const usersController = require("../controllers/users.controller");

router.get("/generate-code/:id", usersController.generateCode)
// router.post("/bonus/:id", usersController.generateCode)

router.get("/bonus/:userId", usersController.getInvitees)
router.post("/activate-account/:userId", usersController.activateAccount)

router.get("/:token", usersController.getUserByToken);
router.put("/:userId", usersController.updateUser);

router.post("/:userId/request/:courseId", usersController.requestCourse)

router.post("/:userId/:courseId", usersController.unlockCourse)

module.exports = router;

/**
 * @swagger
 *  /users/bonus/{userId}:
 *   get:
 *     tags:
 *       - users
 *     summary: Gets the full bonus tree of the user
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: id of the user
 *     responses:
 *       "500":
 *         description: Error
 *       "200":
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BonusTree"
*/

/**
 * @swagger
 *  /users/{userId}/{courseId}:
 *   put:
 *     tags:
 *       - users
 *     summary: Gets the full bonus tree of the user
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: id of the user
 *      - in: path
 *         name: courseId
 *         schema:
 *           type: string
 *         required: true
 *         description: id of the course to unlock
 *     responses:
 *       "500":
 *         description: Error
 *       "405":
 *         description: Code Already in use
 *       "403":
 *         description: Code is not registered
 *       "402":
 *         description: Code doesn't belong to that course
 *       "200":
 *         description: Success
*/

/**
 * @swagger
 *  /users/{userId}:
 *   put:
 *     tags:
 *       - users
 *     summary: Updates the user data
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: id of the user
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/User"
 *     responses:
 *       "500":
 *         description: Error
 *       "200":
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
*/


/**
 * @swagger
 *  /users/{token}:
 *   put:
 *     tags:
 *       - users
 *     summary: Updates the user data
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/User"
 *     responses:
 *       "500":
 *         description: Error
 *       "200":
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
*/


/**
 * @swagger
 *  /courses/{coursesId}:
 *   get:
 *     tags:
 *       - users
 *     summary: Returns the full list of courses
 *     responses:
 *       "500":
 *         description: Error
 *       "200":
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
*/

/**
 * @swagger
 *  components:
 *
 *    schemas:
 *
 *      BonusTree:
 *        type: object
 *        properties:
 *          level1Invitees:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Invitee'
 *          level2Invitees:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Invitee'
 *          level3Invitees:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Invitee'
 *          level4Invitees:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Invitee'
 *          level5Invitees:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Invitee'
 *          level6Invitees:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Invitee'
 *          level7Invitees:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Invitee'
 *          level8Invitees:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Invitee'
 *          level9Invitees:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Invitee'
 *          level10Invitees:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Invitee'
 *
 *      Invitee:
 *        type: object
 *        properties:
 *          inviteeId:
 *            type: string
 *          isActivated:
 *            type: boolean
 *
 *      User:
 *        type: object
 *        properties:
 *          _id:
 *            description: id of the user
 *            type: string
 *          firstName:
 *            description: first name of the user
 *            type: string
 *          lastName:
 *            description: last name of the user
 *            type: string
 *          birthDate:
 *            description: birthdate of the user
 *            type: string
 *          gender:
 *            description: gender of the user
 *            type: string
 *          job:
 *            description: job of the user
 *            type: string
 *          email:
 *            description: email of the user
 *            type: string
 *          password:
 *            description: password of the user
 *            type: string
 *          isActivated:
 *            description: is the account activated
 *            type: boolean
 *          invitees:
 *            description: users invited by this user
 *            type: array
 *            items:
 *              type: string
 *          inviter:
 *            description: the user who invited user, null if none
 *            type: string
 *          bonus:
 *            description: bonus cumulated by the user
 *            type: string
 *          image:
 *            description: image of the user
 *            type: string
 *          phone:
 *            description: phone number of the user
 *            type: string
 *          location:
 *            description: location by governorate of the user
 *            type: string
*/