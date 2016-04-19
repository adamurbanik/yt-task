(function() {

  appVideoModalDirective.$inject = ['$sce'];

  function link(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: VideoModalController) {
    ctrl.setElement(element);
  }

  function appVideoModalDirective($sce: ng.ISCEService) {
    return {
      templateUrl: 'tmpl/modal.html',
      restrict: 'E',
      controller: 'VideoModalController',
      controllerAs: 'vm',
      replace: true,
      bindToController: true,
      scope: {
        visible: '=',
        url: '@',
        type: '=',
        title: '@'
      },
      link
    }
  }

  angular
    .module('ytApp')
    .directive('appVideoModal', appVideoModalDirective)
    .filter('unsafe', function($sce) { return $sce.trustAsResourceUrl; });

})()
