const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUDNAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_APISECRET
});

const uploadOnCloudinary = async (filePath) => {
    try {
        if (!filePath) return null;

        const response = await cloudinary.uploader.upload(filePath);

        console.log("File is uploaded on Cloudinary", response.url);
        fs.unlinkSync(filePath);
        return response;
    }
    catch (error) {
        fs.unlinkSync(filePath);
        console.error("Error uploading file on Cloudinary", error);
        return error;
    }
};

const uploadBatchOnCloudinary = async (images) => {
    try {
        const promises = images.map(async (image) => {
            const response = await cloudinary.uploader.upload(image.path);
            return response;
        });
        const results = await Promise.all(promises);
        images.map((image) => fs.unlinkSync(image.path));
        return results;
    }
    catch (error) {
        console.error("Error uploading batch files on Cloudinary", error);
        images.map((image) => fs.unlinkSync(image.path));
        return error;
    }
};

module.exports.uploadOnCloudinary = uploadOnCloudinary;
module.exports.uploadBatchOnCloudinary = uploadBatchOnCloudinary;
