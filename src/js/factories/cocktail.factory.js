angular
  .module('cocktailApp')
  .factory('Cocktail', Cocktail)
  .factory('CocktailComment', CocktailComment);

Cocktail.$inject = ['$resource'];
function Cocktail($resource) {
  return new $resource('/api/search/cocktails/:id', { id: '@id' }, {
    update: { method: 'PUT' },
    favorite: { method: 'POST', url: '/api/search/cocktails/:id/favorite' },
    unfavorite: { method: 'DELETE', url: '/api/search/cocktails/:id/unfavorite' }
  });
}

CocktailComment.$inject = ['$resource'];
function CocktailComment($resource) {
  return new $resource('/api/search/cocktails/:cocktailId/comments/:id', { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
