angular
  .module('cocktailApp')
  .controller('CocktailsIndexCtrl', CocktailsIndexCtrl);

CocktailsIndexCtrl.$inject = ['Cocktail', 'filterFilter', '$scope', '$http'];
function CocktailsIndexCtrl(Cocktail, filterFilter, $scope, $http) {
  const vm = this;
  getCocktails();

  Cocktail
    .query()
    .$promise
    .then(cocktails => {
      vm.all = cocktails;
      filterCocktails();
    });

  function filterCocktails() {
    const params = { name: vm.query };

    if(vm.useSpirit) params.spirit = vm.spirit;
    if(vm.useUserRating) params.userRating = vm.userRating;

    vm.filtered = filterFilter(vm.all, params);
  }

  $scope.$watchGroup([
    () => vm.query,
    () => vm.useSpirit,
    () => vm.useUserRating,
    () => vm.spirit,
    () => vm.userRating
  ], filterCocktails);

  function getCocktails() {
    $http
      .get('/api/cocktails')
      .then((response) => {
        vm.cocktails = response.data.result;
        console.log(vm.cocktails);
      });
  }

}
