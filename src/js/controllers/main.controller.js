angular
  .module('cocktailApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$transitions', '$rootScope', '$state', '$auth'];
function MainCtrl($transitions, $rootScope, $state, $auth) {
  const vm = this;
  vm.isAuthenticated = $auth.isAuthenticated;
  const protectedStates = ['cocktailsNew', 'cocktailsShow'];

  vm.burgerMenuOpen = false;

  $rootScope.$on('error', (e, err) => {
    vm.message = err.data.message;
    if (err.status === 401 && vm.pageName !== 'login') {
      vm.stateHasChanged = false;
      $state.go('login');
    }

  });

  $transitions.onSuccess({}, (transition) => {
    vm.pageName = transition.to().name;

    if(!$auth.isAuthenticated() && protectedStates.includes(vm.pageName)) {
      vm.message = 'You must be logged in to view this page.';
      return $state.go('login');
    }
    if (vm.stateHasChanged) vm.message = null;
    if (!vm.stateHasChanged) vm.stateHasChanged = true;
    if($auth.getPayload()) vm.currentUserId = $auth.getPayload().userId;
  });

  vm.logout = logout;
  function logout() {
    $auth.logout();
    $state.go('cocktailsIndex');
  }
}
