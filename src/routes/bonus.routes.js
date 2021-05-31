const router = require("express").Router();
const bonusController = require("../controllers/bonus.controller")

router.get("/:userId", bonusController.getBonus)
router.get("/tree/:userId", bonusController.getBonusTree)

module.exports = router

/**
 * @swagger
 *  /bonus/{userId}:
 *   get:
 *     tags:
 *       - bonus
 *     summary: Get the bonus of the user
 *
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: id of the user
 *
 *     responses:
 *
 *       "500":
 *         description: Error
 *
 *       "200":
 *         description: Success, the list of requested courses Ids
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bonus:
 *                   type: number
 *                   description: the bonus in Dinars
*/

/**
 * @swagger
 *  /bonus/tree/{userId}:
 *   get:
 *     tags:
 *       - bonus
 *     summary: Get the bonus tree of the user
 *
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: id of the user
 *
 *     responses:
 *
 *       "500":
 *         description: Error
 *
 *       "200":
 *         description: Success, the complete bonus tree of the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BonusTree'
*/

/**
 * @swagger
 *  components:
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
 *            description: the id of the Invitee
 *          accountType:
 *            type: string
 *            description: the accountType of the Invitee
 *          bonus:
 *            type: string
 *            description: the bonus the user gets thanks to the Invitee
 *          coursesNumber:
 *            type: number
 *            description: the courses purchased by the invitee
*/
