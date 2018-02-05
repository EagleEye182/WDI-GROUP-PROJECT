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
      },{
        name: 'Alin-ator',
        description: 'Kicks likes a mule, tastes like a hug',
        story: 'The creator Alin enjoys a solid drink that reminds you that you drank it! His combination of Sour, Sweet and BAM definitely remind you of that',
        userRating: 5,
        video: '',
        spirit: 'Vodka',
        mixer: 'Apple Sours, Lemon Juice, Grenadine and Blue Caracao, Lime Peel',
        alcoholic: true,
        occasion: 'Party',
        tastes: 'Sweet, Sour, Apple, citrus, lemon',
        image: 'http://blog.opentable.com/wp-content/uploads/2017/07/Oceanaire-2.0.jpeg',
        color: 'blue-green',
        createdBy: users[0]
      },{
        name: 'Willster-Slam',
        description: 'A shot that takes you back... to the day before! Well rounded, tasty drink.',
        story: 'Will created this for coffee lovers. He experimented for a while, until he found the perfect blend of tastes',
        userRating: 4,
        video: '',
        spirit: 'Whiskey',
        mixer: 'Kaluha, Creme de Menthe, Chocolate Liquor',
        alcoholic: true,
        occasion: 'Christmas',
        tastes: 'Sweet, Mint, Chocolate, Coffee, Cream',
        image: 'https://i.pinimg.com/originals/b2/27/67/b2276732ca296c30812e5b0b6218a815.jpg',
        color: 'Green',
        createdBy: users[0]
      },{
        name: 'Ani-Damn!',
        description: 'A shot... just hit it',
        story: 'Bourbon lover that likes a citrus twist',
        userRating: 5,
        video: '',
        spirit: 'Bourbon',
        mixer: 'Lemon Juice, Orange Juice',
        alcoholic: true,
        occasion: 'Halloween',
        tastes: 'Sweet, Citrus',
        image: 'http://www.thehungrytravelerblog.com/wp-content/uploads/2015/04/El-Campadre-4-edited.jpg',
        color: 'Orange',
        createdBy: users[0]
      },{
        name: 'Ani-Damn!',
        description: 'A shot... just hit it',
        story: 'Bourbon lover that likes a citrus twist',
        userRating: 5,
        video: '',
        spirit: 'Bourbon',
        mixer: 'Lemon Juice, Orange Juice',
        alcoholic: true,
        occasion: 'Halloween',
        tastes: 'Sweet, Citrus',
        image: 'http://www.thehungrytravelerblog.com/wp-content/uploads/2015/04/El-Campadre-4-edited.jpg',
        color: 'Orange',
        createdBy: users[0]
      }]);
  })
  .then((cocktails) => console.log(`${cocktails.length} cocktails created!`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
