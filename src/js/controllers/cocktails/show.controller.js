angular
  .module('cocktailApp')
  .controller('CocktailsShowCtrl', CocktailsShowCtrl);

CocktailsShowCtrl.$inject = ['Cocktail', '$state', '$auth', '$sce', 'User'];
function CocktailsShowCtrl(Cocktail, $state, $auth, $sce, User) {
  const vm = this;
  vm.newComment = {};
  vm.addComment = addComment;
  vm.selectTab = selectTab;
  vm.delete = cocktailsDelete;
  vm.deleteComment = deleteComment;
  vm.favorite = favorite;
  vm.unfavorite = unfavorite;
  vm.userHasFavorited = userHasFavorited;
  const currentUserId = $auth.getPayload().userId;
  vm.currentUser = User.get({ id: currentUserId });
  vm.cocktailForDelete = Cocktail.get($state.params);

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

        vm.cocktail.youtubePlayer = $sce.trustAsHtml(`<iframe width="600" height="420" src="https://www.youtube.com/embed/${vm.cocktail.videos[0].video}" frameborder="0" allowfullscreen></iframe>`);

      } else {
        vm.cocktail = response;

        vm.tabs = {
          instructions: true,
          ingredients: false,
          video: false,
          comments: false
        };
        vm.isAuthenticated = $auth.isAuthenticated;

        vm.cocktail.youtubePlayer = $sce.trustAsHtml(`<iframe width="100%" height="515" src="https://www.youtube.com/embed/${vm.cocktail.video}" frameborder="0" allowfullscreen></iframe>`);

      }
      getCommentsOnCocktail();
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

  function cocktailsDelete() {
    vm.cocktailForDelete
      .$remove()
      .then(() => $state.go('cocktailsIndex'));
  }

  function addComment() {

    Cocktail
      .addComment({ cocktailId: $state.params.id}, vm.newComment)
      .$promise
      .then((comment) => {

        vm.cocktail.comments.push(comment);

        vm.newComment = {};
      });
  }

  function addFavorite() {

    Cocktail
      .favorite({cocktailId: $state.params.id})
      .$promise
      .then((res) => {
        vm.currentUser = res;
      });
  }
  vm.addFavorite = addFavorite;

  function deleteComment(comment) {

    Cocktail
      .deleteComment({ id: comment._id, cocktailId: $state.params.id })
      .$promise
      .then(() => {

        const index = vm.cocktail.comments.indexOf(comment);

        vm.cocktail.comments.splice(index, 1);
      });
  }

  function favorite() {
    Cocktail
      .favorite({ id: vm.cocktail.id })
      .$promise
      .then((response) => vm.cocktail.favorites = response.favorites);
  }

  function unfavorite() {
    Cocktail
      .unfavorite({ id: vm.cocktail.id })
      .$promise
      .then((response) => vm.cocktail.favorites = response.favorites);
  }

  function userHasFavorited() {
    const userId = $auth.getPayload().userId;
    return vm.cocktail && vm.cocktail.favorites && vm.cocktail.favorites.indexOf(userId) > -1;
  }

  function hasFavorited() {
    return vm.currentUser &&  vm.currentUser.favorites && vm.currentUser.favorites.indexOf($state.params.id) > -1;
  }

  vm.hasFavorited = hasFavorited;

}
