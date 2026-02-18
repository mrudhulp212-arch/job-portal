const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const { isApplied } = require('./applied');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage for resume PDFs
const pdfStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'resumes', // The folder in Cloudinary where files will be stored
        resource_type: 'auto', // To handle non-image files
        allowed_formats: ['pdf'], // Only allow PDFs
    },
});

// Storage for profile images
const profileImage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'profile_images',
        allowed_formats: ['jpg', 'png'], // Only allow images (jpg, png)
        transformation: [{ width: 500, height: 500, crop: 'limit' }], // Optionally resize the image
    },
});
const companyIconImage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'company_icon_images',
        allowed_formats: ['jpg', 'png'], // Only allow images (jpg, png)
        transformation: [{ width: 500, height: 500, crop: 'limit' }], // Optionally resize the image
    },
});

// Multer upload setups
const uploadResume = multer({ storage: pdfStorage });
const uploadProfileImage = multer({ storage: profileImage });
const uploadIconImage = multer({ storage: companyIconImage });

// Export these functions to use in controllers
module.exports = {
    uploadResume,
    uploadProfileImage,
    uploadIconImage
};