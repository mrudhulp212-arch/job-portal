const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 25,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxLength: 30,
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        default: 'https://thumbs.dreamstime.com/b/user-profile-vector-flat-illustration-avatar-person-icon-gender-neutral-silhouette-profile-picture-user-profile-vector-flat-304778094.jpg'
    },
    profession: String,
    experienced: Number,
    bio: String,
    userType:{
        type: String,
        default: 'employee',
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema);
module.exports = User
