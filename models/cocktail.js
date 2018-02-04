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
  spirit: {type: String},
  mixer: {type: String},
  alcoholic: {type: Boolean},
  occasion: {type: String},
  tastes: {type: String},
  image: {type: String},
  color: {type: String},
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User'},
  // favorites: [{ type: mongoose.Schema.ObjectId, ref: 'User', required: true }],
  comments: [ commentSchema ]
});

cocktailSchema.pre('save', function splitUrl(next){
  if(this.isModified('video')) {
    this.video = this.video.match(/[a-zA-Z0-9_-]{11}/);
  }
  next();
});

cocktailSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Cocktail', cocktailSchema);
