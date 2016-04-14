class configureRoute {

  static $inject = ['$stateProvider', '$urlRouterProvider'];

  constructor(public $stateProvider: angular.ui.IStateProvider, public $urlRouterProvider: angular.ui.IUrlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider

      .state('root', {
      url: "/",
      templateUrl: 'tmpl/home.html',
      controller: 'LibraryController',
      controllerAs: 'vm'
    });

    
  }

}

angular.module('ytApp')
  .config(configureRoute);










// (function() {
//
//   'use strict';
//
//   var ytApp = angular.module('ytApp');
//
//   configureRoute.$inject = ['$stateProvider', '$urlRouterProvider'];
//
//   function configureRoute($stateProvider, $urlRouterProvider) {
//
//     $urlRouterProvider.otherwise("/");
//
//     $stateProvider
//
//       .state('root', {
//       url: "/",
//       templateUrl: 'tmpl/home.html',
//       controller: 'LibraryController',
//       controllerAs: 'vm'
//     });
//   }
//
//   ytApp.config(configureRoute);
//
// })();
