angular
  .module('cocktailApp')
  .controller('CocktailsNewCtrl', CocktailsNewCtrl);

CocktailsNewCtrl.$inject = ['Cocktail', '$state'];
function CocktailsNewCtrl(Cocktail, $state) {
  const vm = this;

  vm.cocktail    = { tastes: [] };
  vm.create      = cocktailsCreate;
  vm.addOrRemoveTaste = addOrRemoveTaste;
  vm.tastes      = ['sweet', 'sour', 'fruity', 'fresh', 'herb', 'berry', 'spicy', 'bitter'];

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

  function addOrRemoveTaste(taste) {
    if(vm.cocktail.tastes.indexOf(taste) === -1) {
      vm.cocktail.tastes.push(taste);
    } else {
      const index = vm.cocktail.tastes.indexOf(taste);
      vm.cocktail.tastes.splice(index, 1);
    }
  }

}
