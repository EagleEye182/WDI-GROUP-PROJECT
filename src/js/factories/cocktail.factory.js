// angular
//   .module('cocktailApp')
//   .factory('Cocktail', Cocktail)
//   .factory('CocktailComment', CocktailComment);
//
// Cocktail.$inject = ['$resource'];
// function Cocktail($resource) {
//   return new $resource('/api/cocktails/:id', { id: '@id' }, {
//     update: { method: 'PUT' },
//     favorite: { method: 'POST', url: '/api/cocktails/:id/favorite' },
//     unfavorite: { method: 'DELETE', url: '/api/cocktails/:id/unfavorite' }
//   });
// }
//
// CocktailComment.$inject = ['$resource'];
// function CocktailComment($resource) {
//   return new $resource('/api/cocktails/:cocktailId/comments/:id', { id: '@id' }, {
//     update: { method: 'PUT' }
//   });
// }
