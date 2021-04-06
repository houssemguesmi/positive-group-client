const router = require("express").Router();
const usersController = require("../controllers/users.controller");

router.get("/generate-code/:id", usersController.generateCode)
router.get("/bonus-tree/:id", usersController.getBonusTree)
// router.post("/bonus/:id", usersController.generateCode)

router.put("/:token", usersController.getUserByToken);
router.post("/updateUser", usersController.updateUser);

module.exports = router;

