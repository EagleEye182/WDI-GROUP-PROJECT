angular
  .module('cocktailApp')
  .controller('RegisterCtrl', RegisterCtrl);

RegisterCtrl.$inject = ['$auth', '$state', '$scope', '$rootScope'];
function RegisterCtrl($auth, $state, $scope, $rootScope) {
  const vm = this;
  vm.user = {};

  function submit() {
    if (vm.registerForm.$valid) { //add form validation
      $auth.signup(vm.user)
        .then(() => $state.go('login'))
        .catch(() => $state.go('register'));
    }
  }

  $rootScope.$on('uploadedImage', (e, data) => {
    vm.user.image = data.file.url;
    $scope.$apply();
  });

  vm.submit = submit;
}
