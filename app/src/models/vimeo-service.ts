

class VimeoService {

  validationPattern: RegExp = /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;
  urlPattern: string = "https://vimeo.com/api/v2/video/:id.json";

  static $inject = ['$q', '$http'];

  constructor(public $q: ng.IQService, public $http: ng.IHttpService) {

  }

  validate(url: string): boolean {
    return this.validationPattern.test(url);
  };

  parseHash(url: string): string {
    if (!this.validate(url)) {
      return null;
    }
    return url.match(this.validationPattern)[3];
  };

  fetchVideo(url: string): ng.IPromise<IVideo> {
    return this.getData(this.parseHash(url));
  };

  getData(videoID: string): ng.IPromise<IVideo> {
    return this
      .$http({
      method: 'GET',
      url: this.urlPattern.replace(':id', videoID)
    })
      .then((object: any) => {
      return {
        type: 'vimeo',
        videoID: object.data[0].id,
        title: object.data[0].title,
        thumb: object.data[0].thumbnail_medium,
        author: object.data[0].user_name,
        url: "http://player.vimeo.com/video/" + videoID + "?api=1&player_id=playerVimeo"
      }
    })
      .catch(() => {
      return {
        error: '$http gettting vimeo failed'
      }
    })
  }


}

angular
  .module('ytApp')
  .service('vimeoService', VimeoService);
