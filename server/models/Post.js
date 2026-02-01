const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createdAt: {   // It will automatically get created : Time of Creation
        type: Date,
        default: Date.now
    },
    updatedAt: {   // Update of Creation
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('POST', PostSchema);