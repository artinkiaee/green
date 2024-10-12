const mongoose = require('mongoose');
const subProduct = require('./subProduct');

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  thumbnail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image'
  },
  catalog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image'
  },
  category: {
    type: String
  },
  QandA: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QandA'
  }
});

module.exports = mongoose.model('Product', ProductSchema);