const express = require('express');
const { getSavedJobs, getSavedJobById, saveJob, removeSavedJob } = require('../controllers/saveJobController');
const { checkLogin } = require('../midlleware/checkLogin');
const { isUser } = require('../midlleware/checkAccess');
const router = express.Router();

router.get('/', checkLogin, isUser, getSavedJobs);
// router.get('/:id', checkLogin, getSavedJobById);
router.post('/', checkLogin, saveJob);
router.delete('/:id',checkLogin, removeSavedJob);

module.exports = router 