const FileUpload = require('../models/FileUploadModel');

const createFileUpload = async (fileUploadData) => {
    const newFileUpload = new FileUpload(fileUploadData);
    return await newFileUpload.save();
};

const getFileUploadById = async (fileUploadId) => {
    return FileUpload.findById(fileUploadId);
};

const updateFileUpload = async (fileUploadId, updateData) => {
    return FileUpload.findByIdAndUpdate(fileUploadId, updateData, {new: true});
};

const deleteFileUpload = async (fileUploadId) => {
    return FileUpload.findByIdAndDelete(fileUploadId);
};

module.exports = {
    createFileUpload,
    getFileUploadById,
    updateFileUpload,
    deleteFileUpload
};
