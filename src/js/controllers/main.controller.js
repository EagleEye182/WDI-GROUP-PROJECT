angular
  .module('cocktailApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = [];
function MainCtrl() {
  console.log('in MainCtrl');
}
