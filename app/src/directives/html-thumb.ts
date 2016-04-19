(function() {

  function link(scope, element, attributes) {

  }

  function htmlThumbDirective() {
    return {
      restrict: 'E',
      link
    }
  }
  
  
  angular
    .module('ytApp')
    .directive('htmlThumb', htmlThumbDirective);


})()
