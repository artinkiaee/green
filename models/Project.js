const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  city: String,
  thumbnail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image'
  }
},{
  timestamps: true
});

module.exports = mongoose.model('Project', ProjectSchema);