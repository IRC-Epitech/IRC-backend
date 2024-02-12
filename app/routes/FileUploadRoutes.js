const express = require('express');
const router = express.Router();
const fileUploadController = require('../controllers/FileUploadController');

router.post('/fileuploads', fileUploadController.createFileUpload);
router.get('/fileuploads/:fileUploadId', fileUploadController.getFileUpload);
router.put('/fileuploads/:fileUploadId', fileUploadController.updateFileUpload);
router.delete('/fileuploads/:fileUploadId', fileUploadController.deleteFileUpload);

module.exports = router;