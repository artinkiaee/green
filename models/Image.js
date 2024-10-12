const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
      },
      altText: String,
      createdAt: {
        type: Date,
        default: Date.now
      }
});

module.exports = mongoose.model('Image', ImageSchema);