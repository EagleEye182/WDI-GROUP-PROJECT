angular
  .module('cocktailApp')
  .controller('yourProfileCtrl', YourProfileCtrl);

YourProfileCtrl.$inject = ['Cocktail', '$state'];
function YourProfileCtrl(Cocktail, $state) {
  const vm = this;
  vm.user = Cocktail.get($state.params);

  console.log(vm.user);
}
