const router = require("express").Router();
const chaptersController = require("../controllers/chapters.controller");
const authenticateToken = require("../middlewares/authenticateToken");

// Getting the list of chapters
router.get("/", chaptersController.getAllChapters);
router.get("/:id", chaptersController.getChapters);

module.exports = router;
