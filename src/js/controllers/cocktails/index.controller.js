angular
  .module('cocktailApp')
  .controller('CocktailsIndexCtrl', CocktailsIndexCtrl);

CocktailsIndexCtrl.$inject = ['Cocktail', 'filterFilter', '$scope', '$http'];
function CocktailsIndexCtrl(Cocktail, filterFilter, $scope, $http) {
  const vm = this;

  $http
    .get('/api/getcocktails')
    .then(response => {
      // console.log('api cocktails', response.data);
      vm.all = response.data;
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
