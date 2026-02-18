    const mongoose = require('mongoose');

    const companySchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        industry: {
            type: String,
            required: true,
        },
        website: {
            type: String,
        },
        description: {
            type: String,
        }, 
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'Employer',
            required: true
        },
        verifiedCompany: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],  // Add the enum for status options
            default: 'pending',  // Set the default value
        },
        logo: {
            type: String,
            default: "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/frontend/profile/dashboard/default_company_logo.png",
        }
    }, { timestamps: true });

    const Company = mongoose.model('Company', companySchema);
    module.exports = Company;
