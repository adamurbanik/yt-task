(function() {

  class VideoModalController {

    private url: string;
    private type: string;
    private title: string;
    private visible: boolean;
    private isSmall: boolean = true;
    private element: JQuery;

    static $inject = ['$scope'];

    constructor(public $scope: ng.IScope) {
      this.startWatcher();
    }

    startWatcher() {
      this.$scope.$watch(
        () => this.visible,
        (isVisible) => {
          if (isVisible === null) {
            return;
          }
          this.showModal();
        }
      );
    }

    showModal() {
      this.element.modal('show');
    }
  }

  angular
    .module('ytApp')
    .controller('VideoModalController', VideoModalController);

})();
