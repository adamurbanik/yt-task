(function () {
  "use strict";

  var Storage = function Storage() {

    Storage.$inject = ['localStorage'];

    function Storage(localStorage) {
      this.localStorage = localStorage;
      this.videos = this.localStorage.getStorage();
    }

    Storage.prototype.addItem = function addItem(model) {
      this.videos.push(model);
      this.localStorage.updateStorage(this.videos);
      return this.videos;
    };

    Storage.prototype.removeItem = function removeItem(index) {
      this.videos.splice(index, 1);
      this.localStorage.updateStorage(this.videos);
      return this.videos;
    };

    Storage.prototype.removeAll = function removeAll() {
      this.videos = [];
      this.localStorage.updateStorage(this.videos);
      return this.videos;
    };

    Storage.prototype.addFavourite = function(index) {
      this.videos[index].favourite = true;
      this.videos[index].favourCount++;
      this.localStorage.updateStorage(this.videos);
      return this.videos;
    };
    
    Storage.prototype.increaseViewingCount = function increaseViewingCount(index) {
      this.videos[index].viewingCount++;
      this.localStorage.updateStorage(this.videos);
      return this.videos;
    };
    
    return Storage;

  } ();

  angular
    .module('ytApp')
    .service('storage', Storage);

})();