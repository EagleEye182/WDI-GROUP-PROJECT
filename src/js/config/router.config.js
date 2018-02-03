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
    })
    .state('cocktailsIndex', {
      url: '/',
      templateUrl: 'js/views/cocktails/index.html',
      controller: 'CocktailsIndexCtrl as vm'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'js/views/auth/login.html',
      controller: 'LoginCtrl as vm'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'js/views/auth/register.html',
      controller: 'RegisterCtrl as vm'
    });

  $urlRouterProvider.otherwise('/');
}
