const Company = require("../models/companyModel")

const getAllCompanies = async (req, res) => {
    const filterObj = { ...req.query }
        if (filterObj.searchKey) {
            filterObj.$or = [
                { name: { '$regex': filterObj.searchKey, '$options': 'i' } },
                { industry: { '$regex': filterObj.searchKey, '$options': 'i' } },
                { location: { '$regex': filterObj.searchKey, '$options': 'i' } }
            ];
        }
    delete filterObj.searchKey;
    try {
        const companies = await Company.find(filterObj);
        if (req.query.sort) companies = companies.sort(req.query.sort)

        if (companies.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Jobs not found"
            })
        }

        res.status(200).json({
            success: true,
            data: companies
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to get all the companies"
        })
    }
}
const getCompanyById = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id).exec();
        return res.status(200).json({
            success: true,
            data: company
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to get the company"
        })
    }
}
const addCompany = async (req, res) => {
    try {
        if (req.file) req.body.logo = req.file.path;

        const company = new Company(req.body);
        await company.save();

        res.status(200).json({
            success: true,
            data: company
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to create company"
        })
    }
}
const updateCompany = async (req, res) => {
    console.log(req.body)
    try {
        const company = await Company.findById(req.params.id);

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        if (req.file) req.body.logo = req.file.path;
        Object.assign(company, req.body);
        const updatedCompany = await company.save();

        return res.status(200).json({
            success: true,
            data: updatedCompany,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to update the company information"
        })
    }
}
const deleteCompany = async (req, res) => {
    try {
        const deletedCompany = await Company.findOneAndDelete({ _id: req.params.id });

        if (deleteCompany) {
            return res.status(200).json({
                success: true,
                message: "Deleted successfully",
                data: deletedCompany
            });
        }

        res.status(404).json({
            success: false,
            message: 'Company not found'
        });

    } catch (error) {
        // Handle any errors that occur
        res.status(500).json({
            success: false,
            message: 'Error removing the company'
        });
    }
}

module.exports = {
    getAllCompanies,
    getCompanyById,
    addCompany,
    updateCompany,
    deleteCompany
}