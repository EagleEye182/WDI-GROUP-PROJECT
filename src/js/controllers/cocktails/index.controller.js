angular
  .module('cocktailApp')
  .controller('CocktailsIndexCtrl', CocktailsIndexCtrl);

CocktailsIndexCtrl.$inject = ['Cocktail', 'filterFilter', '$scope'];
function CocktailsIndexCtrl(Cocktail, filterFilter, $scope) {
  const vm = this;

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
}
