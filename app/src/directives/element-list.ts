(function() {

  function link(scope, element, attributes) {

  }

  function htmlElementDirective() {
    return {
      restrict: 'E',
      link
    }
  }
  

  angular
    .module('ytApp')
    .directive('htmlElement', htmlElementDirective);


})()
