require("dotenv").config();
const User = require("../models/User");

module.exports = {

    requestActivation: async (req, res) => {
        try {
            let userId = req.params.userId;
            await User.findByIdAndUpdate(userId, { accountType: 'pending' })
            res.status(200).send('Requested')
        } catch (error) {
            res.status(500).send(error)
        }
    },

    unlockCourse: async (req, res) => {
        try {
            let userId = req.params.userId;
            let courseId = req.body.courseId;
            let code = await ActivationCode.find({ code: req.body.activationCode });
            let courseCodes = Course.find({ codes: { "$in": [req.body.activationCode] } })

            if (code) {
                res.status(403).send("Code does not exist")
            } else if (code.usedBy === null) {
                res.status(405).send("Code already used")
            } else if (!courseCodes) {
                res.status(402).send("Code doesn't belong to that course")
            }

            await ActivationCode.findByIdAndUpdate(code._id, { usedBy: userId })
            await User.findByIdAndUpdate(userId, { courses: { "$push": [courseId] } })

            res.status(200).send("Activated")

        } catch (error) {
            console.error(error)
            res.status(500).send(error)
        }
    },

    requestCourse: async (req, res) => {
        try {
            let userId = req.params.userId;
            let courseId = req.body.courseId;
            console.log(courseId)
            await User.findByIdAndUpdate(userId, { $push: { courseRequests: courseId } })
            res.status(200).send("Request Created")
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    },

    getUserCoursesRequests: async (req, res) => {
        try {
            let userId = req.params.userId
            let coursesRequests = await User.findById(userId, { 'courseRequests': 1, '_id': 0 })
            res.status(200).send(coursesRequests)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }
}