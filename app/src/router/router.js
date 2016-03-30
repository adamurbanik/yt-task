(function () {
  
  'use strict';
  
  var ytApp = angular.module('ytApp');
  
  configureRoute.$inject = ['$stateProvider', '$urlRouterProvider'];
  
  function configureRoute($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider

      .state('root', {
        url: "/",
        templateUrl: 'tmpl/home.html',
        controller: 'LibraryController',
        controllerAs: 'vm'
      });
  }

  ytApp.config(configureRoute);
   
})();