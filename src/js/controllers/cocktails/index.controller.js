angular
  .module('cocktailApp')
  .controller('CocktailsIndexCtrl', CocktailsIndexCtrl);

CocktailsIndexCtrl.$inject = ['Cocktail', 'filterFilter', '$scope', '$http', 'orderByFilter'];
function CocktailsIndexCtrl(Cocktail, filterFilter, $scope, $http, orderByFilter) {
  const vm = this;

  vm.offset = 0;

  vm.loadMore = loadMore;
  vm.flavourFilters = ['fruity', 'fresh', 'sweet', 'sour', 'herb', 'bitter', 'spicy', 'berry'];

  getCocktailsFromApi();

  function getCocktailsFromApi() {
    $http
      .get(`/api/getcocktails/${vm.offset}`)
      .then(response => {
        vm.all = response.data;
        vm.all.map((cocktail) => {
          cocktail.imagePath = `http://assets.absolutdrinks.com/drinks/${cocktail.id}.png`;
        });

        vm.offset += 25;

        filterCocktails();
      });
  }

  function loadMore() {
    getCocktailsFromApi();
  }


  $http
    .get('/api/cocktails')
    .then((localresponse) => {
      vm.local = localresponse.data;
      console.log(vm.local);

      filterCocktails();
    });

  function filterCocktails() {

    if(vm.all && !(vm.nameSearch || vm.useNameSearch || vm.flavourSearch || vm.ratingFilter)) vm.filtered = vm.local.concat(vm.all);
    console.log('in here');

    if(vm.nameSearch) {
      const params = { name: vm.nameSearch};
      $http
        .get(`/api/quickSearch/${vm.nameSearch}`)
        .then(response => {
          vm.filteredApi = response.data;
          vm.filteredApi.map((cocktail) => {
            cocktail.imagePath = `http://assets.absolutdrinks.com/drinks/${cocktail.id}.png`;
          });
          vm.filteredLocal = filterFilter(vm.local, params);

          vm.filtered = vm.filteredLocal.concat(vm.filteredApi);

          vm.filtered = orderByFilter(vm.filtered, vm.ratingFilter);
          if(vm.flavourSearch) {
            vm.filtered = vm.filtered.filter(cocktail => {
              if(cocktail.tastes.find(obj => obj.id === vm.flavourSearch)) return cocktail;
            });
          }
        });

    }

    // vm.filtered = filterFilter(vm.all, params);
    vm.filtered = orderByFilter(vm.filtered, vm.ratingFilter);

    if(vm.flavourSearch) {
      vm.filtered = vm.filtered.filter(cocktail => {
        if(cocktail.tastes.find(obj => obj.id === vm.flavourSearch)) return cocktail;
      });
    }
  }
  $scope.$watchGroup([
    () => vm.nameSearch,
    () => vm.useNameSearch,
    () => vm.flavourSearch,
    () => vm.ratingFilter
  ], filterCocktails);
}
