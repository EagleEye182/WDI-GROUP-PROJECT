angular
  .module('cocktailApp')
  .controller('CocktailsShowCtrl', CocktailsShowCtrl);

CocktailsShowCtrl.$inject = ['Cocktail', 'CocktailComment', '$state', '$auth'];
function CocktailsShowCtrl(Cocktail, CocktailComment, $state, $auth) {
  const vm = this;
  vm.newComment = {};
  vm.cocktail = Cocktail.get($state.params);

  function cocktailsDelete() {
    vm.cocktail
      .$remove()
      .then(() => $state.go('cocktailsIndex'));
  }

  vm.delete = cocktailsDelete;

  function addComment() {
    CocktailComment
      .save({ cocktailId: vm.cocktail.id }, vm.newComment)
      .$promise
      .then((comment) => {
        vm.cocktail.comments.push(comment);
        vm.newComment = {};
      });
  }

  vm.addComment = addComment;

  function deleteComment(comment) {
    CocktailComment
      .delete({ cocktailId: vm.cocktail.id, id: comment.id })
      .$promise
      .then(() => {
        const index = vm.cocktail.comments.indexOf(comment);
        vm.cocktail.comments.splice(index, 1);
      });
  }

  vm.deleteComment = deleteComment;

  function favorite() {
    Cocktail
      .favorite({ id: vm.cocktail.id })
      .$promise
      .then((response) => vm.cocktail.favorites = response.favorites);
  }

  vm.favorite = favorite;

  function unfavorite() {
    Cocktail
      .unfavorite({ id: vm.cocktail.id })
      .$promise
      .then((response) => vm.cocktail.favorites = response.favorites);
  }

  vm.unfavorite = unfavorite;

  function userHasFavorited() {
    const userId = $auth.getPayload().userId;
    return vm.cocktail && vm.cocktail.favorites && vm.cocktail.favorites.indexOf(userId) > -1;
  }

  vm.userHasFavorited = userHasFavorited;
}
