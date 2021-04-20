const router = require("express").Router();
const requestsController = require("../controllers/requests.controller")

router.post("/activation/:userId", requestsController.requestActivation)
router.post("/courses/:userId", requestsController.requestCourse)
router.get("/:userId", requestsController.getUserCoursesRequests)

module.exports = router;

/**
 * @swagger
 *  /requests/{userId}:
 *   get:
 *     tags:
 *       - requests
 *     summary: Getting the requested courses of one user
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
*/

/**
 * @swagger
 *  /requests/courses/{userId}:
 *   post:
 *     tags:
 *       - requests
 *     summary: Creating a request to purchase a course
 *
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: id of the user
 *
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                courseId:
 *                  type: string
 *
 *          application/x-www-form-urlencoded:
 *            schema:
 *              type: object
 *              properties:
 *                payload:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      courseId:
 *                        type: string
 *            encoding:
 *              payload:
 *                contentType: application/json
 *
 *     responses:
 *
 *       "500":
 *         description: Error
 *
 *       "200":
 *         description: Success
*/

/**
 * @swagger
 *  /requests/activation/{userId}:
 *   post:
 *     tags:
 *       - requests
 *     summary: Creating a request to activate account
 *
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: id of the user
 *
 *     requestBody:
 *        required: false
 *
 *     responses:
 *
 *       "500":
 *         description: Error
 *
 *       "200":
 *         description: Success
*/