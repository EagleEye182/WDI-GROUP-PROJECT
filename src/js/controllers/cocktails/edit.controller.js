angular
  .module('cocktailApp')
  .controller('CocktailsEditCtrl', CocktailsEditCtrl);

CocktailsEditCtrl.$inject = ['$state', 'Cocktail'];
function CocktailsEditCtrl($state, Cocktail) {
  const vm = this;
  vm.cocktail = Cocktail.get($state.params);
  vm.tastes      = ['sweet', 'sour', 'fruity', 'fresh', 'herb', 'berry', 'spicy', 'bitter'];
  vm.update = cocktailsUpdate;
  vm.addNewIngredient = addNewIngredient;
  vm.deleteIngredient = deleteIngredient;
  vm.addOrRemoveTaste = addOrRemoveTaste;
  vm.addOccasion = addOccasion;
  vm.deleteOccasion = deleteOccasion;

  function cocktailsUpdate(){

    Cocktail
      .update({id: $state.params.id}, vm.cocktail)
      .$promise
      .then(() => {
        $state.go('cocktailsShow', $state.params);
      });
  }

  function addNewIngredient() {
    vm.cocktail.ingredients.push({});
  }

  function addOrRemoveTaste(taste) {
    if(vm.cocktail.tastes.indexOf(taste) === -1) {
      vm.cocktail.tastes.push(taste);
    } else {
      const index = vm.cocktail.tastes.indexOf(taste);
      vm.cocktail.tastes.splice(index, 1);
    }
  }

  function deleteIngredient(ingredient) {
    const index = vm.cocktail.ingredients.indexOf(ingredient);
    vm.cocktail.ingredients.splice(index, 1);
  }

  function addOccasion() {
    vm.cocktail.occasions.push({});
  }

  function deleteOccasion(occasion) {
    const index = vm.cocktail.occasions.indexOf(occasion);
    vm.cocktail.occasions.splice(index, 1);
  }
}
