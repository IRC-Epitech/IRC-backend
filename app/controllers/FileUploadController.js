const fileUploadService = require('../services/FileUploadService');

exports.createFileUpload = async (req, res) => {
    try {
        const fileUpload = await fileUploadService.createFileUpload(req.body);
        res.status(201).send(fileUpload);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getFileUpload = async (req, res) => {
    try {
        const fileUpload = await fileUploadService.getFileUploadById(req.params.fileUploadId);
        if (!fileUpload) {
            return res.status(404).send({ message: 'File upload not found' });
        }
        res.status(200).send(fileUpload);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateFileUpload = async (req, res) => {
    try {
        const fileUpload = await fileUploadService.updateFileUpload(req.params.fileUploadId, req.body);
        if (!fileUpload) {
            return res.status(404).send({ message: 'File upload not found' });
        }
        res.status(200).send(fileUpload);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.deleteFileUpload = async (req, res) => {
    try {
        const fileUpload = await fileUploadService.deleteFileUpload(req.params.fileUploadId);
        if (!fileUpload) {
            return res.status(404).send({ message: 'File upload not found' });
        }
        res.status(200).send({ message: 'File upload deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};
