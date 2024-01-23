const mongoose = require('mongoose');
const { Schema } = mongoose;
const { toFrenchTime } = require('../utils/transformDate');

const FileUploadSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    filePath: String,
    uploadDate: { type: Date, default: Date.now },
});
FileUploadSchema.methods.getFrenchUploadDate = function() {
    return toFrenchTime(this.uploadDate);
};
const FileUpload = mongoose.model('FileUpload', FileUploadSchema);
module.exports = FileUpload;
