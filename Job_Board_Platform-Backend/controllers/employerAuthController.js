const Employer = require("../models/employerModel");
const bcrypt = require('bcrypt');
const { tokenCreat, cookieSafetyMeasures } = require("../midlleware/tokenCookie");

const employerLogin = async (req, res) => {
    // console.log("employer")
    try {
        const { email, password } = req.body

        const employer = await Employer.findOne({ email: email });

        if (!employer) {
            return res.status(400).json({
                success: false,
                message: "login failed, looks like it is not your email"
            })
        }

        const passMatch = bcrypt.compareSync(password, employer.password);
        if (!passMatch) {
            return res.status(400).json({
                success: false,
                message: "login failed, password is incourrect"
            })
        }
        
        const token = await tokenCreat(employer)
        res.cookie('token', token, cookieSafetyMeasures)
        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                id: employer._id,
                name: employer.name,
                email: employer.email,
                userType: employer.userType, 
                profileImage: employer.profileImage
            }
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "login failed"
        })
    }
}

const employerVerify = async (req, res) => {

    res.status(200).json({
        success: true,
        message: "autherised access",
        data : req.employer ? req.employer : req.admin
    })
}

const employerlogout = async (req, res) => {
    res.clearCookie('token', { path: '/' });
    res.clearCookie('refreshToken', { path: '/' });
    res.status(200).send({
        success: true,
        message: 'Logout successful'
    });
}

module.exports = {
    employerLogin,
    employerVerify,
    employerlogout
}