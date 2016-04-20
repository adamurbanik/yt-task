class ElementListController {

  static $inject = ['$scope'];

  private movie: Model;
  private gradientPercentage: number;

  constructor(public $scope: ng.IScope) {
    this.$scope.$watch(() => this.movie.favourCount + this.movie.dislikeCount, () => {
      let allCount = (this.movie.favourCount + this.movie.dislikeCount)
      this.gradientPercentage = (allCount > 0) ? (this.movie.favourCount / allCount) * 100 : 50;
    });

  }

}


angular
  .module('ytApp')
  .controller('ElementListController', ElementListController)