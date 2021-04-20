const ActivationCode = require("../models/ActivationCode");
const CreditCode = require("../models/CreditCode");
const CourseCode = require("../models/CourseCode");

module.exports = {

    markActivationCodeAsUsed: async (req, res) => {
        try {
            let code = req.params.code;
            let codeData = await ActivationCode.find({ code: code });
            if (!codeData) {
                res.status(405).send("Code does not exist")
            }
            await ActivationCode.findOneAndUpdate({ code: code }, { usedBy: req.body.userId, usedOn: Date.now })
            res.status(200).send("Success")
        } catch (error) {
            console.error(error)
            res.status(500).send(error)
        }
    },

    markCreditCodeAsUsed: async (req, res) => {
        try {
            let code = req.params.code;
            let codeData = await CreditCode.find({ code: code });
            if (!codeData) {
                res.status(405).send("Code does not exist")
            }
            await CreditCode.findOneAndUpdate({ code: code }, { usedBy: req.body.userId, usedOn: Date.now })
            res.status(200).send("Success")
        } catch (error) {
            console.error(error)
            res.status(500).send(error)
        }
    },

    markCourseCodeAsUsed: async (req, res) => {
        try {
            let code = req.params.code;
            let codeData = await CourseCode.find({ code: code });
            if (!codeData) {
                res.status(405).send("Code does not exist")
            }
            await CourseCode.findOneAndUpdate({ code: code }, { usedBy: req.body.userId, usedOn: Date.now })
            res.status(200).send("Success")
        } catch (error) {
            console.error(error)
            res.status(500).send(error)
        }
    },

    getActivationCodes: async (req, res) => {
        try {
            let activationCodes = await ActivationCode.find({})
            res.status(200).send(activationCodes)
        } catch (error) {
            console.error(error)
            res.status(500).send(error)
        }
    },

    getCourseCodes: async (req, res) => {
        try {
            let coursesCodes = await CourseCode.find({})
            res.status(200).send(coursesCodes)
        } catch (error) {
            console.error(error)
            res.status(500).send(error)
        }
    },

    getCreditCodes: async (req, res) => {
        try {
            let creditCodes = await CreditCode.find({})
            res.status(200).send(creditCodes)
        } catch (error) {
            console.error(error)
            res.status(500).send(error)
        }
    }
}