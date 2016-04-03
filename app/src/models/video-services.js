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

    VideoService.prototype.init = function (url) {
      for (var i = 0; i < this.services.length; i++) {
        var service = this.services[i];
        if (service.validate(url)) {
          return this.$q.resolve(service);
        }
      }
      return this.$q.reject('invalid URL');
    }

    VideoService.prototype.fetchVideo = function (url) {
      return this
          .init(url)
          .then(function (service) {
            return service.fetchVideo(url);
          });
    };

    return VideoService;
  }();


  angular
    .module('ytApp')
    .service('videoService', VideoService);

})();
