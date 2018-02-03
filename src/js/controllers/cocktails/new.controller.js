angular
  .module('cocktailApp')
  .controller('CocktailsNewCtrl', CocktailsNewCtrl);

CocktailsNewCtrl.$inject = ['Cocktail', '$state'];
function CocktailsNewCtrl(Cocktail, $state) {
  const vm = this;
  vm.cocktail = {};

  function cocktailsCreate() {
    if(vm.newForm.$valid) {
      Cocktail
        .save(vm.cocktail)
        .$promise
        .then(() => $state.go('cocktailsIndex'));
    }
  }

  vm.create = cocktailsCreate;
}
