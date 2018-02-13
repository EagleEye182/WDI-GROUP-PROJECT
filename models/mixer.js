const mongoose = require('mongoose');

const mixerSchema = new mongoose.Schema({
  type: [{type: String, required: true}]
});

mixerSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Mixer', mixerSchema);
