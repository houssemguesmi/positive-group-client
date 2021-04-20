const router = require("express").Router();
const codesController = require("../controllers/codes.controller");

router.put("/activation-codes/:code", codesController.markActivationCodeAsUsed);
router.put("/credit-codes/:code", codesController.markCreditCodeAsUsed);
router.put("/course-codes/:code", codesController.markCourseCodeAsUsed);
router.get("/activation-codes", codesController.getActivationCodes)
router.get("/course-codes", codesController.getCourseCodes)
router.get("/credit-codes", codesController.getCreditCodes)

module.exports = router;