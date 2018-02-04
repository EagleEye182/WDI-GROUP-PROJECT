const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { db, env } = require('../config/environment');
const Cocktail = require('../models/cocktail');
const User = require('../models/user');

mongoose.connect(db[env]);

Cocktail.collection.drop();
User.collection.drop();

User
  .create([{
    username: 'test',
    email: 'test@mail.com',
    password: 'test',
    passwordConfirmation: 'test'
  }])
  .then((users) => {
    console.log(`${users.length} users created!`);

    return Cocktail
      .create([{
        name: 'Margarita',
        description: 'Yummy with lime and salt',
        story: 'Someone great aunty named Margaret just pointed and several ingredients, put it together and it worked',
        userRating: 4,
        video: 'https://www.youtube.com/watch?v=q-gYcvipozY',
        spirit: 'Tequila',
        mixer: 'Soda Water',
        alcoholic: true,
        occasion: 'Party',
        tastes: 'Lime, salt, citrus, lemon',
        image: 'https://goo.gl/K2SaaW',
        color: 'green',
        createdBy: users[0]
      }]);
  })
  .then((cocktails) => console.log(`${cocktails.length} cocktails created!`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
