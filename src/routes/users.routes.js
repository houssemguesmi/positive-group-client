const router = require("express").Router();
const usersController = require("../controllers/users.controller");

router.post("/signup", usersController.signup);
router.post("/login", usersController.login);

router.post("/generate-code/:id", usersController.generateCode)
router.post("/bonus/:id", usersController.generateCode)

router.put("/:token", usersController.getUserByToken);
router.post("/updateUser", usersController.updateUser);
router.post("/updatePassword", usersController.updatePassword);


module.exports = router;
