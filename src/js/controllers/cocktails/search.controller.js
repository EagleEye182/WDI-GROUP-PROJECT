angular
  .module('cocktailApp')
  .controller('CocktailsSearchCtrl', CocktailsSearchCtrl);

CocktailsSearchCtrl.$inject = ['Cocktail'];
function CocktailsSearchCtrl(Cocktail) {
  const vm = this;
  vm.all = Cocktail.query();
}
