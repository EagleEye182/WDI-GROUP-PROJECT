angular
  .module('cocktailApp')
  .controller('CocktailsIndexCtrl', CocktailsIndexCtrl);

CocktailsIndexCtrl.$inject = ['Cocktail', 'filterFilter', '$scope', '$http'];
function CocktailsIndexCtrl(Cocktail, filterFilter, $scope, $http) {
  const vm = this;

  vm.flavourFilters = ['fruity', 'fresh', 'sweet', 'sour', 'herb', 'bitter', 'spicy'];

  $http
    .get('/api/getcocktails')
    .then(response => {
      vm.all = response.data;
      vm.all.map((cocktail) => {
        cocktail.imagePath = `http://assets.absolutdrinks.com/drinks/${cocktail.id}.png`;
      });

      filterCocktails();
    });

  $http
    .get('/api/cocktails')
    .then((localresponse) => {
      vm.local = localresponse.data;

      filterCocktails();
    });

  function filterCocktails() {
    const params = { name: vm.nameSearch};

    if(vm.useNameSearch) params.name = vm.nameSearch;

    vm.filtered = filterFilter(vm.all, params);

    if(vm.flavourSearch) {
      vm.filtered = vm.filtered.filter(cocktail => {
        if(cocktail.tastes.find(obj => obj.id === vm.flavourSearch)) return cocktail;
      });
    }
  }
  $scope.$watchGroup([
    () => vm.nameSearch,
    () => vm.useNameSearch,
    () => vm.flavourSearch
  ], filterCocktails);
}
