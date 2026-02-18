const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 35,
    },
    headline: {
        type: String,
        required: true,
        maxLength: 80,
    },
    description: {
        type: String,
        required: true,
    },
    company:{
        type: mongoose.Types.ObjectId,
        ref: "Company"
    },
    salary: {
        type: Number,
        required: true,
        min: 0,
    },
    location: {
        type: String,
        required: true, 
    },
    jobType: {
        type: String,
        enum: ['part-time', 'full-time'],
        default: 'full-time',
    },
    hiring: {
        type: Boolean,
        default: true,
    },
    jobCreatedBy:{
        type: mongoose.Types.ObjectId,
        ref: "Employer",
        required: true,
    },
    verifiedJob:{
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    }
}, { timestamps: true })

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
