angular
  .module('cocktailApp')
  .controller('CocktailsIndexCtrl', CocktailsIndexCtrl);

CocktailsIndexCtrl.$inject = ['Cocktial'];
function CocktailsIndexCtrl(Cocktail) {
  const vm = this;
  vm.all = Cocktail.query();
}
