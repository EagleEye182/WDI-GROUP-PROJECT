const mongoose = require('mongoose');

const spiritSchema = new mongoose.Schema({
  type: [{type: String, required: true}]
});

spiritSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Spirit', spiritSchema);
