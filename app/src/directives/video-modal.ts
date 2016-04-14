(function () {
  'use strict';

  function AppVideoModal($sce) {
    return {
      templateUrl: 'tmpl/modal.html',
      restrict: 'E',
      controller: 'VideoModalController',
      controllerAs: 'vm',
      replace: true,
      bindToController: true,
      scope: {
        visible: '=',
        url: '=',
        type: '=',
        title: '@'
      },
      link: function postLink(scope, element, attrs, ctrl) {
        ctrl.element = element;
        
      }
    };
  }

  angular
    .module('ytApp')
    .directive('appVideoModal', AppVideoModal)
    .filter('unsafe', function ($sce) { return $sce.trustAsResourceUrl; });
})();








