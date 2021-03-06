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
    passwordConfirmation: 'test',
    image: 'https://images-na.ssl-images-amazon.com/images/I/51a8L-dlWzL._UX385_.jpg'
  }])
  .then((users) => {
    console.log(`${users.length} users created!`);

    return Cocktail
      .create([{
        story: 'Someone great aunty named Margaret just pointed and several ingredients, put it together and it worked',
        color: 'green',
        rating: 100,
        skill: {
          name: 'Average'
        },
        video: 'https://www.youtube.com/watch?v=q-gYcvipozY',
        isAlcoholic: true,
        isCarbonated: false,
        servedIn: {
          text: 'Martini Glass'
        },
        ingredients: [
          {
            textPlain: 'Tequila'
          },
          {
            textPlain: 'Fresh Lime'
          },
          {
            textPlain: 'Salt'
          },
          {
            textPlain: 'Triple Sec'
          },
          {
            textPlain: 'Ice'
          }
        ],
        tastes: ['fresh', 'sour', 'sweet'],
        occasions: [
          {
            text: 'Afternoon Drinks'
          },
          {
            text: 'Evening Drinks'
          }
        ],
        tools: [
          {
            text: 'Shaker'
          },
          {
            text: 'Citrus Press'
          },
          {
            text: 'Knife'
          }
        ],
        id: 'vadher',
        name: 'Vadher',
        image: 'http://stevethebartender.com.au/wp-content/uploads/2013/09/japanese-slipper-cocktail.jpg',
        descriptionPlain: 'Fill shaker with ice. Juice the lime using the Citrus Press. Add Lime Juice to shaker, with 1 Part Tequila, 1 Part Triple Sec. Shake until tired',
        createdBy: users[0]
      }]);
  })
  .then((cocktails) => console.log(`${cocktails.length} cocktails created!`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
