const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
},{
  timestamps: true
});

const cocktailSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  story: {type: String},
  userRating: {type: Number},
  video: {type: String},
  spirit: { type: mongoose.Schema.ObjectId, ref: 'Spirit', required: true },
  mixer: { type: mongoose.Schema.ObjectId, ref: 'Mixer', required: true },
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
