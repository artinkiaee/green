const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    subCategory: {
        type: String
    },
    thumbnail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }
});

module.exports = mongoose.model('Gallery', GallerySchema);