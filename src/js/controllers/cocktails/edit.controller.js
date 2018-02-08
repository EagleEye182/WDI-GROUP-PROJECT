angular
  .module('cocktailApp')
  .controller('CocktailsEditCtrl', CocktailsEditCtrl);

CocktailsEditCtrl.$inject = ['$state', 'Cocktail'];
function CocktailsEditCtrl($state, Cocktail) {
  const vm = this;
  vm.cocktail = Cocktail.get($state.params);
  vm.update = cocktailsUpdate;
  // console.log(vm.cocktail);

  function cocktailsUpdate(){
    // console.log($state.params.id); //gives me ID
    // console.log(vm.cocktail); // gives full object of cocktail

    Cocktail
      .update($state.params.id, vm.cocktail)
      .$promise
      .then((cocktail) => {
        console.log(cocktail);
        // $state.go('cocktailsShow', $state.params);
      });
  }
}
