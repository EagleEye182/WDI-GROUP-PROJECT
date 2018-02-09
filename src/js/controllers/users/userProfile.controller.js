angular
  .module('cocktailApp')
  .controller('UserProfileCtrl', UserProfileCtrl);

UserProfileCtrl.$inject = ['User', 'Cocktail', '$auth'];
function UserProfileCtrl(User, Cocktail, $auth) {
  const vm = this;
  vm.selectUserTab = selectUserTab;
  if($auth.getPayload()) vm.currentUserId = $auth.getPayload().userId;
  User
    .get({id: vm.currentUserId})
    .$promise
    .then(response => {
      vm.user = response;
      getFavorites();
    });

  function getFavorites() {

    vm.favoriteCocktailsDetails = [];

    vm.user.favorites.forEach((favorite) => {

      Cocktail
        .get({ id: favorite})
        .$promise
        .then(response => {
          if(response.result) {
            const cocktail = response.result[0];
            cocktail.imagePath = `http://assets.absolutdrinks.com/drinks/${cocktail.id}.png`;
            vm.favoriteCocktailsDetails.push(cocktail);

            vm.tabs = {
              posts: true,
              likes: false
            };
          } else {
            const cocktail = response;
            vm.favoriteCocktailsDetails.push(cocktail);

            vm.tabs = {
              posts: true,
              likes: false
            };
          }
        });
        console.log('vm.user.favorites', vm.favoriteCocktailsDetails);
    });
  }

  function selectUserTab(type) {
    vm.currentTab = type;
    vm.tabs.posts = false;
    vm.tabs.likes = false;
    vm.tabs[type] = true;
  }

}
