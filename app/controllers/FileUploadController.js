const FileUpload = require('../models/FileUploadModel');

// Créer un fichier upload
exports.createFileUpload = async (req, res) => {
    try {
        const newFileUpload = new FileUpload({
            user: req.body.user,
            filePath: req.body.filePath,
            uploadDate: req.body.uploadDate || new Date()
        });
        await newFileUpload.save();
        res.status(201).send(newFileUpload);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Lire un fichier upload
exports.getFileUpload = async (req, res) => {
    try {
        const fileUpload = await FileUpload.findById(req.params.fileUploadId);
        if (!fileUpload) {
            return res.status(404).send();
        }
        res.status(200).send(fileUpload);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Mettre à jour un fichier upload
exports.updateFileUpload = async (req, res) => {
    try {
        const fileUpload = await FileUpload.findByIdAndUpdate(req.params.fileUploadId, req.body, { new: true });
        if (!fileUpload) {
            return res.status(404).send();
        }
        res.status(200).send(fileUpload);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Supprimer un fichier upload
exports.deleteFileUpload = async (req, res) => {
    try {
        const fileUpload = await FileUpload.findByIdAndDelete(req.params.fileUploadId);
        if (!fileUpload) {
            return res.status(404).send();
        }
        res.status(200).send({ message: 'File upload deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};
