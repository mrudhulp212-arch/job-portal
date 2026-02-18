const isUser = async (req, res, next) => {
    if(req.user) next()
    else return res.status(401).send({
        success: false,
        message: "Trying to access form a non user account"
    })
}
const isEmployer = async (req, res, next) => {
    if(!req.employer) return res.status(401).send({
        success: false,
        message: "Trying to access form a non employer account"
    })

    next()
}
const isAdmin = async (req, res, next) => {
    if(req.admin) next()
    else return res.status(401).send({
        success: false,
        message: "Trying to access form a non admin account"
    })
}

module.exports = {
    isUser,
    isEmployer,
    isAdmin
}