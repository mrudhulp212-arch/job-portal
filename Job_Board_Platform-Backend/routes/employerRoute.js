const express = require('express');
const { getAllEmployers, getEmployerById, addEmployer, updateEmployer, deleteEmployer } = require('../controllers/employerController');
const { uploadProfileImage } = require('../midlleware/handlUpload');
const { checkLogin } = require('../midlleware/checkLogin');
const router = express.Router();

router.get('/', getAllEmployers);
router.get('/:id', getEmployerById);
router.post('/', uploadProfileImage.single('profileImage'), addEmployer);
router.patch('/:id', checkLogin, uploadProfileImage.single('profileImage'), updateEmployer);
router.delete('/:id', checkLogin, deleteEmployer);
 
module.exports = router