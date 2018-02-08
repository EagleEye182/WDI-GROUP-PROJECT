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

  function cocktailsUpdate(){
    // console.log($state.params.id); //gives me ID
    // console.log(vm.cocktail); // gives full object of cocktail

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

  function addNewTaste() {
    vm.cocktail.tastes.push({});
  }

  function deleteIngredient(ingredient) {
    // console.log(ingredient);
    // console.log(vm.cocktail.ingredients);
    const index = vm.cocktail.ingredients.indexOf(ingredient);
    vm.cocktail.ingredients.splice(index, 1);
  }
}
