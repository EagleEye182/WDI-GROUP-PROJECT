angular
  .module('cocktailApp')
  .factory('Cocktail', Cocktail);
// .factory('CocktailsFilter', CocktailsFilter);

Cocktail.$inject = ['$resource'];
function Cocktail($resource) {
  return new $resource('/api/cocktails/:id', { id: '@id' }, {
    update: { method: 'PUT' },
    favorite: { method: 'POST', url: '/api/cocktails/:id/favorite' },
    unfavorite: { method: 'DELETE', url: '/api/cocktails/:id/unfavorite' },
    addComment: { method: 'POST', url: '/api/cocktails/:id/comments' },
    deleteComment: { method: 'DELETE', url: '/api/cocktails/:cocktailId/comments/:id'}
  });
}

// function CocktailsFilter() {
//   const all = [{
//     id: 1,
//     name: 'Margarita',
//     description: 'Yummy with lime and salt',
//     story: 'Someone great aunty named Margaret just pointed and several ingredients, put it together and it worked',
//     userRating: 4,
//     video: 'https://www.youtube.com/watch?v=q-gYcvipozY',
//     spirit: 'Tequila',
//     mixer: 'Soda Water',
//     alcoholic: true,
//     occasion: 'Party',
//     tastes: 'Lime, salt, citrus, lemon',
//     image: 'https://goo.gl/K2SaaW',
//     color: 'green'
//   },{
//     id: 2,
//     name: 'Alin-ator',
//     description: 'Kicks likes a mule, tastes like a hug',
//     story: 'The creator Alin enjoys a solid drink that reminds you that you drank it! His combination of Sour, Sweet and BAM definitely remind you of that',
//     userRating: 5,
//     video: '',
//     spirit: 'Vodka',
//     mixer: 'Apple Sours, Lemon Juice, Grenadine and Blue Caracao, Lime Peel',
//     alcoholic: true,
//     occasion: 'Party',
//     tastes: 'Sweet, Sour, Apple, citrus, lemon',
//     image: 'http://blog.opentable.com/wp-content/uploads/2017/07/Oceanaire-2.0.jpeg',
//     color: 'blue-green'
//   },{
//     id: 3,
//     name: 'Willster-Slam',
//     description: 'A shot that takes you back... to the day before! Well rounded, tasty drink.',
//     story: 'Will created this for coffee lovers. He experimented for a while, until he found the perfect blend of tastes',
//     userRating: 4,
//     video: '',
//     spirit: 'Whiskey',
//     mixer: 'Kaluha, Creme de Menthe, Chocolate Liquor',
//     alcoholic: true,
//     occasion: 'Christmas',
//     tastes: 'Sweet, Mint, Chocolate, Coffee, Cream',
//     image: 'https://i.pinimg.com/originals/b2/27/67/b2276732ca296c30812e5b0b6218a815.jpg',
//     color: 'Green'
//   },{
//     id: 4,
//     name: 'Ani-Damn!',
//     description: 'A shot... just hit it',
//     story: 'Bourbon lover that likes a citrus twist',
//     userRating: 5,
//     video: '',
//     spirit: 'Bourbon',
//     mixer: 'Lemon Juice, Orange Juice',
//     alcoholic: true,
//     occasion: 'Halloween',
//     tastes: 'Sweet, Citrus',
//     image: 'http://www.thehungrytravelerblog.com/wp-content/uploads/2015/04/El-Campadre-4-edited.jpg',
//     color: 'Orange'
//   },{
//     idem: 5,
//     name: 'Guys Secret Elixir',
//     description: 'A drink that is smooth, but tread with caution',
//     story: 'Guy created this to get hammered - and boy does it serve its purpose',
//     userRating: 5,
//     video: '',
//     spirit: 'Whiskey',
//     mixer: 'Vodka, Lemonade, Baileys',
//     alcoholic: true,
//     occasion: 'Night Out',
//     tastes: 'Cream and Lemon',
//     image: 'https://mixthatdrink.com/wp-content/uploads/2011/09/jack-knife-drink-600x900.jpg',
//     color: 'Cream'
//   },{
//     id: 6,
//     name: 'Bens Secret to Youth',
//     description: 'Strong, and Gets Stronger',
//     story: 'Ben design this to put some serious hair on your chest',
//     userRating: 4,
//     video: '',
//     spirit: 'Bourbon',
//     mixer: 'More Bourbon and Lime Juice',
//     alcoholic: true,
//     occasion: 'Casual',
//     tastes: 'Lime',
//     image: 'https://s-media-cache-ak0.pinimg.com/originals/86/b0/a6/86b0a6c70ce7a39d9bdace08d661139d.jpg',
//     color: 'Amber, Cloudy'
//   }];
//   return {
//     query() {
//       return all;
//     }
//   };
// }
