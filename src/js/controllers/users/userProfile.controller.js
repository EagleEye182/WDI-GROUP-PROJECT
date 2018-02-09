angular
  .module('cocktailApp')
  .controller('UserProfileCtrl', UserProfileCtrl);

UserProfileCtrl.$inject = ['User', '$auth'];
function UserProfileCtrl(User, $auth) {
  const vm = this;
  if($auth.getPayload()) vm.currentUserId = $auth.getPayload().userId;
  vm.user = User.get({id: vm.currentUserId});
}
