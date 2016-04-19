(function() {

  function link(scope, element, attributes) {
    let button = element.children()[0];
    $(button).on('click', function() {
      let bottomText = button.getElementsByClassName('bottomText');
      (scope.direction) ?
        bottomText[0].innerHTML = 'Od najnowszych do najstarszych' :
        bottomText[0].innerHTML = 'Od najstarszych do najnowszych';

    });
  }


  function appSortingDirective() {
    return {
      restrict: 'E',
      scope: {
        direction: '='
      },
      link
    }
  }

  angular
    .module('ytApp')
    .directive('appSorting', appSortingDirective);

})()
