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
    email: 'test',
    password: 'test'
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
        image: 'https://www.google.co.uk/search?q=margarita+drink+images&tbm=isch&source=iu&ictx=1&fir=BZH7NN8dULVwDM%253A%252C7nf2shJMl8WcTM%252C_&usg=__rYb9gIQI_qlbIoCm4iXY-QWArjs%3D&sa=X&ved=0ahUKEwiD0OyAlIrZAhWHDMAKHdlPBAAQ9QEIMzAE#imgrc=BZH7NN8dULVwDM',
        color: 'green',
        createdBy: users[0]
      }]);
  })
  .then((cocktails) => {
    console.log(`${cocktails.length} cocktails created!`);
  })
  .finally(() => {
    return mongoose.connection.close();
  })
  .catch(err => console.log(err));
