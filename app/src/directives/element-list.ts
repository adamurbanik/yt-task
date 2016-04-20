(function() {

  function link(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: ElementListController) {}

  function htmlListElementDirective() {
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
    .directive('htmlListElement', htmlListElementDirective);


})();
