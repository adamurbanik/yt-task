class VideoModalController {

  static $inject = ['$scope'];

  private url: string;
  private type: string;
  private title: string;
  private visible: boolean;
  private isSmall: boolean = true;
  private element: JQuery;

  constructor(public $scope: ng.IScope) {
    this.$scope.$watch(() => this.visible, (isVisible) => {
      if (isVisible === null) {
        return;
      }
      this.showModal();
    }
    );
  }

  setElement (element: JQuery) {
    this.element = element;
  }

  showModal() {
    this.element.modal('show');
  }
}

angular
  .module('ytApp')
  .controller('VideoModalController', VideoModalController);
