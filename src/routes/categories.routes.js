const router = require("express").Router();
const categoriesController = require("../controllers/categories.controller");
const authenticateToken = require("../middlewares/authenticateToken");

// Retrieving existing Categories
router.get("/", categoriesController.getAllCategories);
router.get("/:categoryId", categoriesController.getCategoryById)

module.exports = router;

/**
 * @swagger
 *  /categories:
 *   get:
 *     summary: Returns the full list of categories
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
 *                 $ref: '#/components/schemas/Category'
*/

/**
 * @swagger
 *  /categories/{categoryId}:
 *   get:
 *     summary: Returns the full list of categories
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
 *                 $ref: '#/components/schemas/Category'
*/

/**
 * @swagger
 *  components:
 *    schemas:
 *      Category:
 *        type: object
 *        properties:
 *          _id:
 *            type: string
 *          name:
 *            type: string
 *          description:
 *            type: string
 *          courses:
 *            type: array
 *            items:
 *              type: string
*/
