const Application = require("../models/applicationModel");

const isApplied = async (req, res, next) => {
    const userId = req.user.id;
    const { jobId } = req.body;
    console.log('isapplied', jobId)
    try {
        console.log(userId, jobId);
        const alreadyApplied = await Application.findOne({ userId, jobId }).lean()
        if (alreadyApplied) {
            console.log("alreadyApplied")
            next({
                code: 409,
                message: "you are already applied for this job"
            })
            return
        } else {
            next()
        }

    } catch (error) {
        console.log(error)
        next({
            code: 404,
            message: error.message
        })
    }
}

module.exports = {
    isApplied
}