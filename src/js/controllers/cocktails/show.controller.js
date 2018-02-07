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
      if(response.result) {
        vm.cocktail = response.result[0];

        vm.cocktail.imagePath = `http://assets.absolutdrinks.com/drinks/${vm.cocktail.id}.png`;

        vm.tabs = {
          instructions: true,
          ingredients: false,
          video: false,
          comments: false
        };
        vm.isAuthenticated = $auth.isAuthenticated;

        vm.cocktail.youtubePlayer = $sce.trustAsHtml(`<iframe width="100%" height="515" src="https://www.youtube.com/embed/${vm.cocktail.videos[0].video}" frameborder="0" allowfullscreen></iframe>`);

        getCommentsOnCocktail();
      } else {
        console.log('not in an array');
        vm.cocktail = response;
        console.log(vm.cocktail.ingredients);

        vm.tabs = {
          instructions: true,
          ingredients: false,
          video: false,
          comments: false
        };
        vm.isAuthenticated = $auth.isAuthenticated;

        vm.cocktail.youtubePlayer = $sce.trustAsHtml(`<iframe width="100%" height="515" src="https://www.youtube.com/embed/${vm.cocktail.videos[0].video}" frameborder="0" allowfullscreen></iframe>`);
      }
    });

  function getCommentsOnCocktail() {
    Cocktail
      .getComments({id: $state.params.id})
      .$promise
      .then((response) => {
        vm.cocktail.comments = response.comments;
      });
  }

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
      .addComment({ cocktailId: $state.params.id}, vm.newComment)
      .$promise
      .then((comment) => {

        vm.cocktail.comments.push(comment);

        vm.newComment = {};
      });
  }

  vm.addComment = addComment;

  function deleteComment(comment) {

    Cocktail
      .deleteComment({ id: comment._id, cocktailId: $state.params.id })
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
