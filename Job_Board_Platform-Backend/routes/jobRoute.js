const express = require('express');
const { getAllJobs, getJobById, addJob, updateJob, deleteJob } = require('../controllers/jobController');
const { checkLogin } = require('../midlleware/checkLogin');
const { isEmployer } = require('../midlleware/checkAccess');
const router = express.Router();

router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.post('/', checkLogin, isEmployer, addJob);
router.patch('/:id', updateJob);
router.delete('/:id', checkLogin, isEmployer, deleteJob);

module.exports = router