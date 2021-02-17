const router = require("express").Router();
const usersController = require("../controllers/users.controller");

router.post("/users/signup", usersController.signup);
router.post("/users/login", usersController.login);

module.exports = router;
