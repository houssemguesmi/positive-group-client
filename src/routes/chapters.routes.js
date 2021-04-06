const router = require("express").Router();
const chaptersController = require("../controllers/chapters.controller");
const authenticateToken = require("../middlewares/authenticateToken");

router.get("/", chaptersController.getAllChapters);
router.get("/:id", chaptersController.getChapters);

module.exports = router;

/**
 * @swagger
 *  /chapters:
 *   get:
 *     summary: Returns the full list of chapters
 *     responses:
 *       "400":
 *         description: Error
 *       "200":
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Chapter'
*/

/**
 * @swagger
 *  /chapters/{chapterId}:
 *   get:
 *     summary: Returns the chapter that has the chapterId
 *     parameters:
 *       - in: path
 *         name: chapterId
 *         schema:
 *           type: string
 *         required: true
 *         description: The Chapter id
 *     responses:
 *       "400":
 *         description: Error
 *       "200":
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chapter'
*/

/**
 * @swagger
 *  components:
 *    schemas:
 *      Chapter:
 *        type: object
 *        properties:
 *          _id:
 *            type: string
 *          title:
 *            type: string
 *          description:
 *            type: string
 *          video:
 *            type: string
 *          course:
 *            type: string
*/