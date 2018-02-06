angular
  .module('cocktailApp')
  .controller('CocktailsShowCtrl', CocktailsShowCtrl);

CocktailsShowCtrl.$inject = ['Cocktail', '$state', '$auth', '$sce'];
function CocktailsShowCtrl(Cocktail, $state, $auth, $sce) {
  const vm = this;
  vm.newComment = {};

  Cocktail
    .get({ id: $state.params.id})
    .$promise
    .then(response => {
      console.log(response);
      vm.cocktail = response.result[0];

      vm.tabs = {
        instructions: true,
        ingredients: false,
        video: false,
        comments: false
      };
      vm.isAuthenticated = $auth.isAuthenticated;

      vm.cocktail.youtubePlayer = $sce.trustAsHtml(`<iframe width="100%" height="315" src="https://www.youtube.com/embed/${vm.cocktail.video}" frameborder="0" allowfullscreen></iframe>`);
    });

  function selectTab(type) {
    vm.currentTab = type;
    vm.tabs.instructions = false;
    vm.tabs.ingredients = false;
    vm.tabs.video = false;
    vm.tabs.comments = false;
    vm.tabs[type] = true;
  }

  vm.selectTab = selectTab;

  function cocktailsDelete() {
    vm.cocktail
      .$remove()
      .then(() => $state.go('cocktailsIndex'));
  }

  vm.delete = cocktailsDelete;

  function addComment() {
    Cocktail
      .addComment({ cocktailId: vm.cocktail.id }, vm.newComment)
      .$promise
      .then((comment) => {
        console.log(comment);
        vm.cocktail.comments.push(comment);
        console.log(vm.cocktail);
        vm.newComment = {};
      });
  }

  vm.addComment = addComment;

  function deleteComment(comment) {
    Cocktail
      .deleteComment({ cocktailId: vm.cocktail.id, id: comment._id })
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
