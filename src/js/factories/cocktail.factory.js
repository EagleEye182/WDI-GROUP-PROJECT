angular
  .module('cocktailApp')
  .factory('Cocktail', Cocktail);

Cocktail.$inject = ['$resource'];
function Cocktail($resource) {
  return new $resource('/api/cocktails/:id', { id: '@id', cocktailId: '@cocktailId' }, {
    update: { method: 'PUT' },
    create: { method: 'POST', url: '/api/cocktails' },
    favorite: { method: 'POST', url: '/api/cocktails/:cocktailId/favorite' },
    unfavorite: { method: 'DELETE', url: '/api/cocktails/:id/unfavorite' },
    addComment: { method: 'POST', url: '/api/cocktails/:cocktailId/comments' },
    deleteComment: { method: 'DELETE', url: '/api/cocktails/:cocktailId/comments/:id'},
    getComments: { method: 'GET', url: '/api/cocktails/:id/comments' }
  });
}
