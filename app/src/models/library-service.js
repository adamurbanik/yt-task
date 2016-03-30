(function () {
  "use strict";

  var LibraryService = function LibraryService() {

    function LibraryService() {
      this.videos = (function () {
        try {
          return JSON.parse(localStorage.getItem('videos')) || [];
        }
        catch (e) {
          return [];
        }
      })();
    }

    LibraryService.prototype.createModel = function (videoData) {
      var model = {
        type: videoData.type,
        title: videoData.title,
        date: new Date().toISOString(),
        dateNumber: Date.now(),
        thumb: videoData.thumb,
        author: videoData.author,
        favourite: false,
        videoID: videoData.videoID,
        favourCount: 0,
        viewingCount: 0,
        source: videoData.source,
        url: videoData.url
      };
      return model;
    };

    LibraryService.prototype.addItem = function addItem(videoData) {
      this.videos.push(this.createModel(videoData));
      this.sync();
    };

    LibraryService.prototype.removeItem = function removeItem(videoID) {
      var index = this.getIndexByVideoID(videoID);
      this.videos.splice(index, 1);
      this.sync();
    };

    LibraryService.prototype.removeAll = function removeAll() {
      this.videos = [];
      this.sync();
    };

    LibraryService.prototype.sync = function sync() {
      localStorage.setItem('videos', angular.toJson(this.videos));
    };

    LibraryService.prototype.checkIfExists = function checkIfExists(videoID) {
      return this
        .videos
        .map(function (video) {
          return video.videoID;
        })
        .indexOf(videoID) !== -1;
    };

    LibraryService.prototype.getIndexByVideoID = function getIndexByVideoID(videoID) {
      return this
        .videos
        .map(function (video) {
          return video.videoID;
        })
        .indexOf(videoID);
    };

    LibraryService.prototype.addFavourite = function addFavourite(videoID) {
      var index = this.getIndexByVideoID(videoID);
      this.videos[index].favourite = true;
      this.videos[index].favourCount++;
      this.sync();
    };

    LibraryService.prototype.increaseViewingCount = function increaseViewingCount(videoID) {
      var index = this.getIndexByVideoID(videoID);
      this.videos[index].viewingCount++;
      this.sync();
    };

    return LibraryService;

  }();

  angular
    .module('ytApp')
    .service('libraryService', LibraryService);

})();
