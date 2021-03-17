const router = require("express").Router();
const usersController = require("../controllers/users.controller");

router.post("/signup", usersController.signup);
router.post("/login", usersController.login);
router.post("/generate-code/:id", usersController.generateCode)

module.exports = router;
