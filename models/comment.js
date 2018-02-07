const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: {type: String},
  cocktailId: {type: String},
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User'}
},{
  timestamps: true
});

commentSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Comment', commentSchema);
