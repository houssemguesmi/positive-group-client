const ActivationCode = require("../models/ActivationCode");
const CreditCode = require("../models/CreditCode");
const CourseCode = require("../models/CourseCode");
const catchAsync = require("../utils/catchAsync")

module.exports = {

    markActivationCodeAsUsed: catchAsync(async (req, res) => {
        let code = req.params.code;
        let codeData = await ActivationCode.find({ code: code });
        if (!codeData) {
            res.status(405).send("Code does not exist")
        }
        await ActivationCode.findOneAndUpdate({ code: code }, { usedBy: req.body.userId, usedOn: Date.now })
        res.status(200).send("Success")

    }),

    markCreditCodeAsUsed: catchAsync(async (req, res) => {
        let code = req.params.code;
        let codeData = await CreditCode.find({ code: code });
        if (!codeData) {
            res.status(405).send("Code does not exist")
        }
        await CreditCode.findOneAndUpdate({ code: code }, { usedBy: req.body.userId, usedOn: Date.now })
        res.status(200).send("Success")

    }),

    markCourseCodeAsUsed: catchAsync(async (req, res) => {
        let code = req.params.code;
        let codeData = await CourseCode.find({ code: code });
        if (!codeData) {
            res.status(405).send("Code does not exist")
        }
        await CourseCode.findOneAndUpdate({ code: code }, { usedBy: req.body.userId, usedOn: Date.now })
        res.status(200).send("Success")
    }),

    getActivationCodes: catchAsync(async (req, res) => {
        let activationCodes = await ActivationCode.find({})
        res.status(200).send(activationCodes)
    }),

    getCourseCodes: catchAsync(async (req, res) => {
        let coursesCodes = await CourseCode.find({})
        res.status(200).send(coursesCodes)
    }),

    getCreditCodes: catchAsync(async (req, res) => {
        let creditCodes = await CreditCode.find({})
        res.status(200).send(creditCodes)
    })
}