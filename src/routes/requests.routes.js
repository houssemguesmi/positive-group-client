const router = require("express").Router();
const requestsController = require("../controllers/requests.controller")

router.post("/activation/:userId", requestsController.requestActivation)

router.post("/courses/:userId", requestsController.requestCourse)

router.get("/:userId", requestsController.getUserCoursesRequests)

module.exports = router;