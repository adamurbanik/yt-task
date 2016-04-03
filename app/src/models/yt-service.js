(function () {
  "use strict";

  var $ = window.$;

  var YTService = function YTService() {

    YTService.$inject = ['config', '$q'];

    function YTService(config, $q) {
      this.validationPattern = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      this.urlPattern = "https://www.youtube.com/watch?v=:id";
      this.config = config;
      this.$q = $q;
    }

    YTService.prototype.playerOptions = null;
    YTService.prototype.player = null;
    YTService.prototype.iFrame = null;

    YTService.prototype.validate = function validate(url) {
      return this.validationPattern.test(url);
    };

    YTService.prototype.parseHash = function (url) {
      if (!this.validate(url)) {
        return null;
      }
      return url.match(this.validationPattern)[2];
    };

    YTService.prototype.fetchVideo = function fetchVideo(url) {
      return this.getData(this.parseHash(url));
    };

    YTService.prototype.getData = function getData(videoID) {
      var deferred = this.$q.defer();
      $.getJSON('https://noembed.com/embed', {
        format: 'json', url: this.urlPattern.replace(':id', videoID)
      })
        .success(function (data) {
          var videoData = {
            type: "youtube",
            videoID: videoID,
            title: data.title,
            thumb: data.thumbnail_url,
            author: data.author_name,
            url: "http://www.youtube.com/embed/" + videoID + "?autoplay=1"
          };
          deferred.resolve(videoData);
        })
        .error(function () {
          deferred.reject('AJAX getting youtube data failed');
        });
      return deferred.promise;

    };

    return YTService;

  }();


  angular
    .module('ytApp')
    .service('ytService', YTService);

})();
