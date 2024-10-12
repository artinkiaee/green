const mongoose = require('mongoose');

const QandASchema = new mongoose.Schema({
    Q: {
        type: String,
        required: true
    },
    A: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('QandA', QandASchema);