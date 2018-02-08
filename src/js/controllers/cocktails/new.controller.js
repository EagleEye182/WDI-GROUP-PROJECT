angular
  .module('cocktailApp')
  .controller('CocktailsNewCtrl', CocktailsNewCtrl);

CocktailsNewCtrl.$inject = ['Cocktail', '$state'];
function CocktailsNewCtrl(Cocktail, $state) {
  const vm = this;

  vm.cocktail = {};
  vm.create   = cocktailsCreate;


  function cocktailsCreate() {
    if(vm.newForm.$valid) {
      vm.cocktail.id = vm.cocktail.name.toLowerCase();

      Cocktail
        .create(vm.cocktail)
        .$promise
        .then(() => {
          $state.go('cocktailsIndex');
        })
        .catch(err => console.log(err));
    }
  }
}
