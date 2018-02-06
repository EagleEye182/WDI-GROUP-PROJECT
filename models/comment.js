const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: {type: String},
  cocktailId: {type: String}
});

commentSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Cocktail', commentSchema);
