angular
  .module('cocktailApp')
  .controller('CocktailsIndexCtrl', CocktailsIndexCtrl);

CocktailsIndexCtrl.$inject = ['Cocktail'];
function CocktailsIndexCtrl(Cocktail) {
  const vm = this;
  vm.all = Cocktail.query();
}
