class LocalStorage {

  getStorage() {
    try {
      return JSON.parse(localStorage.getItem('videos')) || [];
    }
    catch (e) {
      return [];
    }
  }

  updateStorage(videos) {
    localStorage.setItem('videos', angular.toJson(videos));
  }

}

angular
  .module('ytApp')
  .service('localStorage', LocalStorage);
