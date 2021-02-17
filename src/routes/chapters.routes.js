const router = require("express").Router();
const chaptersController = require("../controllers/chapters.controller");
const authenticateToken = require("../middlewares/authenticateToken");

// Getting the list of chapters
router.get("/", authenticateToken, chaptersController.getAllChapters);

module.exports = router;
