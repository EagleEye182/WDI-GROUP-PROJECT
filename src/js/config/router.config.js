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
    .state('cocktailsSearch', {
      url: '/search',
      templateUrl: 'js/views/cocktails/search.html',
      controller: 'CocktailsSearchCtrl as vm'
    })
    .state('cocktailsIndex', {
      url: '/search/cocktails',
      templateUrl: 'js/views/cocktails/index.html',
      controller: 'CocktailsIndexCtrl as vm'
    })
    .state('cocktailsNew', {
      url: '/search/cocktails/new',
      templateUrl: 'js/views/cocktails/new.html',
      controller: 'CocktailsNewCtrl as vm'
    })
    .state('cocktailsShow', {
      url: '/search/cocktails/:id',
      templateUrl: 'js/views/cocktails/show.html',
      controller: 'CocktailsShowCtrl as vm'
    })
    .state('cocktailsEdit', {
      url: '/search/cocktails/:id/edit',
      templateUrl: 'js/views/cocktails/edit.html',
      controller: 'CocktailsEditCtrl as vm'
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
    })
    .state('usersShow', {
      url: '/users/:id',
      templateUrl: 'js/views/user/show.html',
      controller: 'UsersShowCtrl as vm'
    });

  $urlRouterProvider.otherwise('/');
}
