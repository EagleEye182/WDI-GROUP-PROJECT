angular
  .module('cocktailApp')
  .controller('CocktailsEditCtrl', CocktailsEditCtrl);

CocktailsEditCtrl.$inject = ['$state', 'Cocktail'];
function CocktailsEditCtrl($state, Cocktail) {
  const vm = this;
  vm.cocktail = Cocktail.get($state.params);
  vm.update = cocktailsUpdate;
  // console.log(vm.cocktail);
  vm.addNewIngredient = addNewIngredient;
  vm.deleteIngredient = deleteIngredient;
  vm.addNewTaste = addNewTaste;
  vm.deleteTaste = deleteTaste;
  vm.addOccasion = addOccasion;
  vm.deleteOccasion = deleteOccasion;

  function cocktailsUpdate(){
    Cocktail
      .update({id: $state.params.id}, vm.cocktail)
      .$promise
      .then((cocktail) => {
        console.log(cocktail); //shows unedited cocktail object on submit
        // $state.go('cocktailsShow', $state.params);
      });
  }

  function addNewIngredient() {
    vm.cocktail.ingredients.push({});
  }

  function deleteIngredient(ingredient) {
    const index = vm.cocktail.ingredients.indexOf(ingredient);
    vm.cocktail.ingredients.splice(index, 1);
  }

  function addNewTaste() {
    vm.cocktail.tastes.push({});
  }

  function deleteTaste(taste) {
    console.log(vm.cocktail);
    const index = vm.cocktail.tastes.indexOf(taste);
    vm.cocktail.tastes.splice(index, 1);
  }

  function addOccasion() {
    vm.cocktail.tastes.push({});
  }

  function deleteOccasion(occasion) {
    const index = vm.cocktail.occasions.indexOf(occasion);
    vm.cocktail.occasions.splice(index, 1);
  }
}
