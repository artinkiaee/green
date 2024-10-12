const mongoose = require('mongoose');

const subProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  thumbnail: {
    type : String
  },
  Product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }
});

module.exports = mongoose.model('subProduct', subProductSchema);