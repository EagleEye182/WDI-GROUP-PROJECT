angular
  .module('cocktailApp')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('verif', {
      url: '/',
      templateUrl: 'js/views/cocktails/verif.html'
    });

  $urlRouterProvider.otherwise('/');
}
