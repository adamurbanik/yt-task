(function() {

  function link(scope, element, attributes) {

  }

  function htmlElementDirective() {
    return {
      templateUrl: 'tmpl/element-list.html',
      restrict: 'E',
      controller: 'ElementListController',
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        movie: '='
      },
      link
    }
  }
  

  angular
    .module('ytApp')
    .directive('htmlListElement', htmlElementDirective);


})()
