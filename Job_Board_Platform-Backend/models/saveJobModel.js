const mongoose = require('mongoose');

const saveJobSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    jobs: [
        {
            jobId : {
                type: mongoose.Types.ObjectId,
                required: true,
                ref: "Job"
            },
            jobTitle:{
                type: String,
            },
        },
    ],
    totalJobSaved: {
        type: Number,
        require: true,
        default: 0,
    }
}, { timestamps: true });

saveJobSchema.methods.TotalJobSaved = function () {
    this.totalJobSaved = this.jobs.length;
};

const SavedJob = mongoose.model('SavedJob', saveJobSchema);
module.exports = SavedJob;
