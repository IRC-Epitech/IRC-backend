const mongoose = require('mongoose');
const { Schema } = mongoose;

const FileUploadSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    filePath: String,
    uploadDate: { type: Date, default: Date.now },
});
const FileUpload = mongoose.model('FileUpload', FileUploadSchema);
module.exports = FileUpload;
