const router = require("express").Router();
const codesController = require("../controllers/codes.controller");

router.put("/activation-codes/:code", codesController.markActivationCodeAsUsed);
router.put("/credit-codes/:code", codesController.markCreditCodeAsUsed);
router.put("/course-codes/:code", codesController.markCourseCodeAsUsed);
router.get("/activation-codes", codesController.getActivationCodes)
router.get("/course-codes", codesController.getCourseCodes)
router.get("/credit-codes", codesController.getCreditCodes)

module.exports = router;

/**
 * @swagger
 *  /codes/activation-codes:
 *   get:
 *     tags:
 *       - codes
 *     summary: Returns the full list of activation codes
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
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   code:
 *                     type: string
 *                   createdOn:
 *                     type: date
 *                   usedOn:
 *                     type: date
 *
*/


/**
 * @swagger
 *  /codes/credit-codes:
 *   get:
 *     tags:
 *       - codes
 *     summary: Returns the full list of credit codes
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
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   code:
 *                     type: string
 *                   value:
 *                     type: number
 *                   createdOn:
 *                     type: date
 *                   usedOn:
 *                     type: date
 *
*/


/**
 * @swagger
 *  /codes/course-codes:
 *   get:
 *     tags:
 *       - codes
 *     summary: Returns the full list of course codes
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
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   code:
 *                     type: string
 *                   course:
 *                     type: string
 *                   createdOn:
 *                     type: date
 *                   usedOn:
 *                     type: date
 *
*/


/**
 * @swagger
 *  /codes/activation-codes/{code}:
 *   put:
 *     tags:
 *       - codes
 *     summary: Mark activation code as used
 *
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: the 10 characters code
 *
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                userId:
 *                  type: string
 *                  description: the id of the user
 *
 *     responses:
 *       "500":
 *         description: Error
 *       "405":
 *         description: Code does not exist
 *       "200":
 *         description: Success
 *
*/


/**
 * @swagger
 *  /codes/credit-codes/{code}:
 *   put:
 *     tags:
 *       - codes
 *     summary: Mark credit code as used
 *
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: the 10 characters code
 *
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                userId:
 *                  type: string
 *                  description: the id of the user
 *
 *     responses:
 *       "500":
 *         description: Error
 *       "405":
 *         description: Code does not exist
 *       "200":
 *         description: Success
 *
*/

/**
 * @swagger
 *  /codes/course-codes/{code}:
 *   put:
 *     tags:
 *       - codes
 *     summary: Mark course code as used
 *
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: the 10 characters code
 *
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                userId:
 *                  type: string
 *                  description: the id of the user
 *
 *     responses:
 *       "500":
 *         description: Error
 *       "405":
 *         description: Code does not exist
 *       "200":
 *         description: Success
 *
*/