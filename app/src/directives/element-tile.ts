(function() {

  function link(scope: ng.IScope) {

  }

  function htmlTileElementDirective() {
    return {
      templateUrl: 'tmpl/element-tile.html',
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
    .directive('htmlTileElement', htmlTileElementDirective);

})();