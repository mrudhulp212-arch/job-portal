var jwt = require('jsonwebtoken');

const checkLogin = async (req, res, next) => {
    if(req.cookies.token){
        try{
            const tokenData = await jwt.verify(req.cookies.token, process.env.JWT_TOKEN);
            // console.log('tokenData:', tokenData);
            if(tokenData.userType === 'employee') req.user = tokenData
            if(tokenData.userType === 'employer') req.employer = tokenData
            if(tokenData.userType === 'admin') req.admin = tokenData
            console.log('hello')
            next()
        }
        catch(error) {
            // console.log(error)
            res.status(401).send({
                success: false,
                message: "Unautherised Token access"
            })
        }
    } else { 
        res.status(401).send({
            success: false,
            message: "Unautherised Access"
        })
    }
}

module.exports ={
    checkLogin
}