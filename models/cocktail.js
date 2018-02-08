const mongoose = require('mongoose');

const cocktailSchema = new mongoose.Schema({
  story: {type: String},
  color: {type: String},
  rating: {type: Number},
  skill: {
    name: {type: String}
  },
  video: {type: String},
  isAlcoholic: {type: Boolean},
  isCarbonated: {type: Boolean},
  servedIn: {
    text: {type: String}
  },
  ingredients: [
    {
      textPlain: {type: String}
    }
  ],
  tastes: [
    {
      text: {type: String}
    }
  ],
  occasions: [
    {
      text: {type: String}
    }
  ],
  tools: [
    {
      text: {type: String}
    }
  ],
  id: {type: String},
  name: {type: String},
  image: {type: String},
  descriptionPlain: {type: String},
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User'}
});

cocktailSchema.pre('save', function splitUrl(next){
  if(this.isModified('video')) {
    this.video = this.video.match(/[a-zA-Z0-9_-]{11}/);
  }
  next();
});

cocktailSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Cocktail', cocktailSchema);
