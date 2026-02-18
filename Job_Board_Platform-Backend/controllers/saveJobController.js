
const SavedJob = require('../models/saveJobModel');
const Job = require('../models/jobModel');

// Controller methods
const getSavedJobs = async (req, res) => {
    try {
        const { id } = req.user
        revomeUnavailableJobsFromSave(id)
        
        const savedJobs = await SavedJob.find({ userId: id })
        .populate({
            path: 'jobs.jobId',
            populate: {
                path: 'company', // Populating the company field inside the job
                model: 'Company', // The model name for the company
                select: '_id name' // Select only the _id and name fields from the company
            }
        });
        // console.log("hello,", !savedJobs);
        
        if (!savedJobs  ||  savedJobs.length === 0 ) return res.status(400).json({
            success: false,
            message: 'Nothing found as saved jobs'
        });
        // console.log("savedJobs:", savedJobs);
        

        res.status(200).json({
            success: true,
            data: savedJobs[0].jobs
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Unable to fetch your saved jobs list'
        });
    }
}

// const getSavedJobById = async (req, res) => {
//     try {
//         const savedJob = await SavedJob.findById(req.params.id);
//         if (!savedJob) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Job not found' 
//             });
//         }
//         res.status(200).json({
//             success: true,
//             data: savedJob
//         });
//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             message: 'Unable to fetch your saved jobs list' 
//         });
//     }
// }

const saveJob = async (req, res) => {
    // console.log(req.body)
    const { jobId, jobTitle } = req.body
    // console.log(req.user)
    const userId = req.user.id

    // console.log(req.body)

    try {
        const jobActive = await Job.findOne({ _id: jobId });
        // console.log('jobActive: ', jobActive)
        if (!jobActive) {
            return res.status(400).json({
                success: false,
                message: "Job doesn't exist",
            });
        }

        let savedJob = await SavedJob.findOne({ userId })
        console.log("user id: ",userId)
        if (!savedJob) savedJob = new SavedJob({ userId, jobs: [] });

        const alreadySaved = savedJob.jobs.some(item => item.jobId.equals(jobId))
        if (alreadySaved) return res.status(400).json({ success: false, message: "Job already saved" })

        // console.log('jobId - ',jobId,' jobTitle - ', jobTitle);
        savedJob.jobs.push({ jobId: jobId, jobTitle: jobTitle })
        savedJob.TotalJobSaved();
        // console.log(req.body, savedJob)
        await savedJob.save()

        const populatedSavedJob = await SavedJob.findOne({ userId })
            .populate({
                path: 'jobs.jobId',
                populate: {
                    path: 'company',
                    model: 'Company',
                    select: '_id name'
                }
            });

        //     console.log("hello, ", savedJobs)

        res.status(201).json({
            success: true,
            data: populatedSavedJob.jobs,
        });
    } catch (error) {
        // console.log("================================================")
        // console.log("error: ", error)
        // console.log("================================================")
        res.status(400).json({
            success: false,
            message: 'Failed to save job'
        });
    }
}

const removeSavedJob = async (req, res) => {
    const savedJobId = req.params.id
    const userId = req.user.id

    try {
        const savedJobExist = await SavedJob.findOne({ userId })

        if (!savedJobExist) {
            return res.status(400).json({
                success: false,
                message: 'Not saved any jobs'
            });
        }

        savedJobExist.jobs = savedJobExist.jobs.filter(item => !item.jobId.equals(savedJobId))

        savedJobExist.TotalJobSaved()
        await savedJobExist.save()

        // console.log('savedJobExist:', savedJobExist);

        const populatedSavedJobExist = await SavedJob.findOne({ userId })
            .populate({
                path: 'jobs.jobId',
                populate: {
                    path: 'company',
                    model: 'Company',
                    select: '_id name'
                }
            });

        res.status(201).json({
            success: true,
            data: populatedSavedJobExist.jobs,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'error while removing job'
        });
    }
}

module.exports = {
    getSavedJobs,
    saveJob,
    removeSavedJob,
    // getSavedJobById,
}

const revomeUnavailableJobsFromSave = async (id) => {
    let savedJob = await SavedJob.findOne({ userId: id });
    if (savedJob) {
        const jobs = await Promise.all(savedJob.jobs.map(async (item) => {
            const jobActive = await Job.findOne({ _id: item.jobId });
            if (jobActive) return item;
            return null;
        }));

        savedJob.jobs = jobs.filter(item => item !== null);
        await savedJob.save();
    }
}