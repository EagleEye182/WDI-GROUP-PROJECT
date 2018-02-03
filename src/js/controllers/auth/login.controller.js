angular
  .module('cocktailApp')
  .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$auth', '$state'];
function LoginCtrl($auth, $state) {
  const vm = this;
  vm.credentials = {};

  function submit() {
    if (vm.loginForm.$valid) { //add validation on loginform
      $auth.login(vm.credentials)
        .then(() => $state.go('cocktailsIndex'))
        .catch(() => $state.go('login'));
    }
  }

  vm.submit = submit;
}
