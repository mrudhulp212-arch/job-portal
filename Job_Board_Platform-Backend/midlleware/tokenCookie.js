const jwt = require('jsonwebtoken');

const tokenCreat = async (objDetail) =>{
    const token = await jwt.sign(
        { id: objDetail._id, name: objDetail.name, email: objDetail.email, userType: objDetail.userType, profileImage: objDetail.profileImage },
        process.env.JWT_TOKEN,
        { expiresIn: '1h' }
    );
    return token;
}

const cookieSafetyMeasures = {
    httpOnly: true, 
    secure: process.env.ENVIRONMENT === "development" ? false : true,
    maxAge: 1 * 60 * 60 * 1000,
    sameSite: process.env.ENVIRONMENT === "development" ? 'Lax': 'None'
}

module.exports = {
    tokenCreat,
    cookieSafetyMeasures
}