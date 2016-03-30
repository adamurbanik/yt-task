(function () {
  'use strict';

  var VideoService = function () {
    
    VideoService.$inject = ['ytService', 'vimeoService', '$q'];

    function VideoService(ytService, vimeoService, $q) {
      this.services = [
        ytService,
        vimeoService
      ];
      this.$q = $q;
    }

    VideoService.prototype.validate = function (url) {
      for (var i = 0; i < this.services; i++) {
        var service = this.services[i];
        if (service.validate(url)) {
          return true;
        }
      }
      return false;
    };

    VideoService.prototype.fetchVideo = function (url) {
      for (var i = 0; i < this.services.length; i++) {
        var service = this.services[i];
        if (service.validate(url)) {
          return service.fetchVideo(url);
        }
      }
      return this.$q.reject('invalid URL');
    };

    return VideoService;
  }();


  angular
    .module('ytApp')
    .service('videoService', VideoService);

})();

