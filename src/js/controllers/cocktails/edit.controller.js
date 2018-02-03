angular
  .module('cocktailApp')
  .controller('CocktailsEditCtrl', CocktailsEditCtrl);

CocktailsEditCtrl.$inject = ['$state', 'Cocktail'];
function CocktailsEditCtrl($state, Cocktail) {
  const vm = this;
  vm.cocktail = Cocktail.get($state.params);
  vm.update = cocktailsUpdate;

  function cocktailsUpdate(){
    Cocktail
      .update($state.params, vm.cocktail)
      .$promise
      .then(() => {
        $state.go('cocktailsShow', $state.params);
      });
  }
}
