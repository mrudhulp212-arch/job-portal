const express = require('express');
const { 
    getAllApplications, 
    getApplicationById, 
    addApplication, 
    updateApplication, 
    deleteApplication,
    getUserApplications,
    userAlreadyApplied
 } = require('../controllers/applicationController');
const { 
    uploadResume
 } = require('../midlleware/handlUpload');
const { checkLogin } = require('../midlleware/checkLogin');
const { isApplied } = require('../midlleware/applied');

const router = express.Router();

router.get('/applied_jobs', checkLogin, getUserApplications)
router.post('/applicable', checkLogin, userAlreadyApplied)
router.get('/', checkLogin, checkLogin, getAllApplications);
router.get('/:id', checkLogin, getApplicationById);
router.post('/', checkLogin,  uploadResume.single('resume'), isApplied, addApplication);
router.patch('/:id', checkLogin, uploadResume.single('resume'), updateApplication);
router.delete('/:id', checkLogin, deleteApplication);

module.exports = router
