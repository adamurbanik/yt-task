(function () {
  "use strict";

  var LibraryService = function LibraryService() {

    LibraryService.$inject = ['storage'];
    
    function LibraryService(storage) {
      this.storage = storage;
    }

    LibraryService.prototype.createModel = function (videoData) {
      var model = {
        type: videoData.type,
        title: videoData.title,
        date: new Date().toISOString().slice(0,10),
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
      this.storage.addItem(this.createModel(videoData));
    };

    LibraryService.prototype.removeItem = function removeItem(videoID) {      
      var index = this.getIndexByVideoID(videoID);
      this.storage.removeItem(index); 
    };

    LibraryService.prototype.removeAll = function removeAll() {      
      this.storage.removeAll();
    };

    LibraryService.prototype.checkIfExists = function checkIfExists(videoID) {
      return this
        .storage
        .videos
        .map(function (video) {
          return video.videoID;
        })
        .indexOf(videoID) !== -1;
    };

    LibraryService.prototype.getIndexByVideoID = function getIndexByVideoID(videoID) {            
      return this
        .storage
        .videos
        .map(function (video) {
          return video.videoID;
        })
        .indexOf(videoID);
    };

    LibraryService.prototype.addFavourite = function addFavourite(videoID) {
      var index = this.getIndexByVideoID(videoID);
      this.storage.addFavourite(index);
    };

    LibraryService.prototype.increaseViewingCount = function increaseViewingCount(videoID) {
      var index = this.getIndexByVideoID(videoID);
      this.storage.increaseViewingCount(index);
    };

    return LibraryService;

  }();

  angular
    .module('ytApp')
    .service('libraryService', LibraryService);

})();
