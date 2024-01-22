const FileUpload = require('../models/FileUploadModel');

exports.uploadFile = async (req, res) => {
    try {
        const newFileUpload = new FileUpload(req.body); // Assurez-vous que req.body a les données nécessaires
        await newFileUpload.save();
        res.status(201).send(newFileUpload);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Ajoutez ici d'autres méthodes si nécessaire
