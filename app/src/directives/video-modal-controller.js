(function () {
  'use strict';

  var VideoModalController = (function () {

    VideoModalController.$inject = ['$scope'];

    function VideoModalController($scope) {
      this.$scope = $scope;
      this.startWatcher();
    }

    angular.extend(VideoModalController.prototype, {
      startWatcher: function () {
        var self = this;
        this.$scope.$watch(
          function () {
            return self.visible;
          },
          function (isVisible) {
            if (isVisible === null) {
              return;
            }
            self.showModal();
          });
      },
      showModal: function showModal() {
        this.element.modal('show');
      }
    });

    return VideoModalController;
  })();

  angular
    .module('ytApp')
    .controller('VideoModalController', VideoModalController);
})();


