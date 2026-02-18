const Job = require("../models/jobModel")

const getAllJobs = async (req, res) => {
    console.log("req.query: ", req.query);

    const filterObj = { ...req.query }
    delete filterObj.sort
    delete filterObj.limit
    delete filterObj.select
    if (filterObj.searchKey) {
        filterObj.title = { '$regex':  filterObj.searchKey , '$options': 'i' }
    }
    delete filterObj.searchKey;
    try {
        // console.log("filterObf:", filterObj)
        const jobs = await Job.find(filterObj).populate({
            path: 'company',
            select: '_id name'  // Select only the _id and name fields
        })
        console.log("jobs:", jobs)

        // console.log(jobs)
        if (req.query.sort) jobs = jobs.sort(req.query.sort)

        if (jobs.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Jobs not found"
            })
        }
        // console.log('jobs: ', jobs)

        res.status(200).json({
            success: true,
            data: jobs
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to fetch all the jobs"
        })
    }
}

const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate({
            path: 'company',
            select: '_id name'  // Select only the _id and name fields
        }).exec();
        if (!job) return res.status(400).json({
            success: false,
            message: "Job not find"
        })

        res.status(200).json({
            success: true,
            data: job
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to get the job"
        })
    }
}
const addJob = async (req, res) => {
    try {
        const job = new Job(req.body);
        await job.save();

        res.status(200).json({
            success: true,
            message: "Job created successfully",
            data: job
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to create job"
        })
    }
}

const updateJob = async (req, res) => {
    console.log(req.body);

    try {
        const job = await Job.findById(req.params.id);
        // console.log('job:', job);
        
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }
        Object.assign(job, req.body)
        // console.log('job:', job);
        const updatedJob = await job.save();
        // console.log("updateJob: ", updatedJob);
        
        return res.status(200).json({
            success: true,
            message: "Job's information successfully updated",
            data: updatedJob,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to update the job's information",
            error: error.message
        })
    }
}
const deleteJob = async (req, res) => {
    try {
        const deletedJob = await Job.findOneAndDelete({ _id: req.params.id });

        if (deleteJob) {
            res.status(200).json({
                success: true,
                message: 'Job removed successfully',
                data: deletedJob
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Job not found'
            });
        }
    } catch (error) {
        // Handle any errors that occur
        res.status(500).json({
            success: false,
            message: 'Error removing the job'
        });
    }
}

module.exports = {
    getAllJobs,
    getJobById,
    addJob,
    updateJob,
    deleteJob
}