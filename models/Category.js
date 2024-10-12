const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    thumbnail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }
});

module.exports = mongoose.model('Category', CategorySchema);