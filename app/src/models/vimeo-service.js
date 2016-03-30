(function () {
  'use strict';

  var $ = window.$;

  var VimeoService = function VimeoService() {

    VimeoService.$inject = ['config', '$q', '$http'];


    function VimeoService(config, $q, $http) {
      this.validationPattern = /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;
      this.urlPattern = "https://vimeo.com/api/v2/video/:id.json";
      this.config = config;
      this.$q = $q;
      this.$http = $http;
    }

    VimeoService.prototype.vimPlayer = null;

    VimeoService.prototype.validate = function validate(url) {
      return this.validationPattern.test(url);
    };

    VimeoService.prototype.parseHash = function (url) {
      if (!this.validate(url)) {
        return null;
      }
      return url.match(this.validationPattern)[3];
    };

    VimeoService.prototype.fetchVideo = function fetchVideo(url) {
      if (!this.validate(url)) {
        return this.$q.reject('invalid url');
      }
      
      return this.getData(this.parseHash(url));
    };

    VimeoService.prototype.getData = function getData(videoID) {
      return this.$http({
        method: 'GET',
        url: this.urlPattern.replace(':id', videoID)
      })
        .then(function (object) {
          return {
            type: 'vimeo',
            videoID: object.data[0].id,
            title: object.data[0].title,
            thumb: object.data[0].thumbnail_medium,
            author: object.data[0].user_name,
            url: "http://player.vimeo.com/video/" + videoID + "?api=1&player_id=playerVimeo"
          };
        }, function () {
          return '$http gettting vimeo failed';
        }); 
      
    };

    return VimeoService;

  }();

  angular
    .module('ytApp')
    .service('vimeoService', VimeoService);

})();




      
      


