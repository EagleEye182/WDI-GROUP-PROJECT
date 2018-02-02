const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
},{
  timestamps: true
});

const cocktailSchema = new mongoose.Schema({
  name: {type: String, required: true},
  descriptionPlain: {type: String, required: true},
  story: {type: String},
  userRating: {type: Number},
  video: {type: String},
  ingredients: {type: String},
  alcoholic: {type: Boolean},
  occasion: {type: String},
  tastes: {type: String},
  image: {type: String},
  color: {type: String},
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  favorites: [{ type: mongoose.Schema.ObjectId, ref: 'User', required: true }],
  comments: [ commentSchema ]
});

cocktailSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Cocktail', cocktailSchema);
