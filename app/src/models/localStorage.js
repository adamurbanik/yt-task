(function () {
  "use strict";

  var LocalStorage = function LocalStorage() {

    function LocalStorage() {

    }

    LocalStorage.prototype.getStorage = function getStorage() {
      try {
        return JSON.parse(localStorage.getItem('videos')) || [];
      }
      catch (e) {
        return [];
      }
    };

    LocalStorage.prototype.updateStorage = function updateStorage(videos) {
      localStorage.setItem('videos', angular.toJson(videos));
    };
    
    return LocalStorage;

  }();
  
  angular
    .module('ytApp')
    .service('localStorage', LocalStorage);
    
})();