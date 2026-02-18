const express = require('express');
const { getAllCompanies, getCompanyById, addCompany, updateCompany, deleteCompany } = require('../controllers/companyController');
const { uploadIconImage } = require('../midlleware/handlUpload');
const { checkLogin } = require('../midlleware/checkLogin');
const { isEmployer } = require('../midlleware/checkAccess');
const router = express.Router();

router.get('/', getAllCompanies);
router.get('/:id', getCompanyById);
router.post('/', checkLogin, isEmployer, uploadIconImage.single('companyIconImage'), addCompany);
router.patch('/:id', checkLogin,  uploadIconImage.single('companyIconImage'), updateCompany);
router.delete('/:id', checkLogin, isEmployer, deleteCompany);

module.exports = router