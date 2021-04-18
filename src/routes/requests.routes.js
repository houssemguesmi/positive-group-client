const router = require("express").Router();
const requestsController = require("../controllers/requests.controller")

router.post("/activation/:userId", requestsController.requestActivation)

router.post("/course/:userId", requestsController.requestCourse)

module.exports = router;