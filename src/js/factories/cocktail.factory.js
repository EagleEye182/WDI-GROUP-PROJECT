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
    addComment: { method: 'POST', url: '/api/cocktails/:cocktailId/comments' },
    deleteComment: { method: 'DELETE', url: '/api/cocktails/:cocktailId/comments/:id'}
  });
}
