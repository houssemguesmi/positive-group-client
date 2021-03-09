const router = require("express").Router();
const categoriesController = require("../controllers/categories.controller");
const authenticateToken = require("../middlewares/authenticateToken");

// Retrieving existing Categories
router.get("/", categoriesController.getAllCategories);

module.exports = router;
