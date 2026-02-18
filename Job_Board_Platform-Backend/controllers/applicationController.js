const Application = require('../models/applicationModel');
const mongoose = require('mongoose');

const userAlreadyApplied = async (req, res) => {
    const userId = req.user.id
    const { jobId } = req.body;
    // console.log("userId: ", userId, "jobId: ", jobId)
    try {
        const application = await Application.find({ userId, jobId })

        // console.log(application)
        // console.log(application.length)
        if (application.length < 1) {
            return res.status(200).json({
                success: true,
                data: {allowedToApply : true},
                message: "allow to appply"
            })
        }
        // console.log("hlldlkjdjk")

        res.status(409).json({
            success: false,
            data: {allowedToApply: false},
            message: "already applied"
        })
    } catch (error) {
        console.log(error)
        res.status(409).json({
            success: false,
            data: {allowedToApply: false},
            message: "Error while checking applicable"
        })
    }
}

const getAllApplications = async (req, res) => {
    console.log('all---')
    const filterObj = { ...req.query }
    try {
        const applications = await Application.find(filterObj)
            .populate({
                path: 'userId', // Field to populate
                select: 'name profession experienced _id', // Fields to include from User
            });
        // console.log(applications)
        res.status(200).json({
            success: true,
            data: applications
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Unable to fetch applications'
        });
    }
}

const getUserApplications = async (req, res) => {
    const userId = req.user.id; // replace with actual user ID in your context

    console.log(userId)
    console.log("applications")
    try {
        const applications = await Application.find({ userId })
            .populate({
                path: 'jobId',
                populate: {
                    path: 'company',
                    select: '_id name',
                },
            });

        console.log(applications.length)
        if (applications.length < 1) {
            return res.status(404).json({
                success: false,
                message: "not any applications",
            });
        }
        // Send the applications to the frontend
        res.status(200).json({
            success: true,
            data: applications,
        });
    } catch (error) {
        console.error("Error fetching user applications:", error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve applications",
        });
    }
};

const getApplicationById = async (req, res) => {
    console.log('idAppl---');
    try {
        const application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(400).json({
                success: false,
                message: 'Application not found'
            });
        }
        res.status(200).json({
            success: true,
            data: application
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Unable to fetch application'
        });
    }
}
const addApplication = async (req, res) => {
    try {
        const userId = req.user.id
        const { jobId } = req.body;
        console.log('req.body form controller:', req.body)
        console.log('req.file from controller:', req.file)
        let resumeUrl;
        if (req.file) {
            resumeUrl = req.file.path;
        } else {
            return res.status(400).json({
                success: false,
                message: 'Resume not found',
            });
        }
        // This is the Cloudinary URL

        // Create a new application object
        const newApplication = new Application({
            jobId,
            userId,
            resume: resumeUrl, // Save the Cloudinary URL in the database
        });

        // Save the new application to the database
        await newApplication.save();

        res.status(201).json({
            success: true,
            data: newApplication,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to add application',
            error: error.message,
        });
    }
}
const updateApplication = async (req, res) => {
    console.log(req.user);
    try {
        let updateData = {};

        if (req.file) {
            console.log('Uploaded File:', req.file);
            updateData.resume = req.file.path;
        }

        const updatedApplication = await Application.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!updatedApplication) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }
        res.status(200).json({
            success: true,
            data: updatedApplication
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Unable to update application',
            error: error.message || error
        });
    }
}
const deleteApplication = async (req, res) => {
    try {
        const deletedApplication = await Application.findByIdAndDelete(req.params.id);
        if (!deletedApplication) {
            return res.status(400).json({
                success: false,
                message: 'Application not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Application deleted successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Unable to delete application'
        });
    }
}

module.exports = {
    userAlreadyApplied,
    getAllApplications,
    getUserApplications,
    getApplicationById,
    addApplication,
    updateApplication,
    deleteApplication,
}