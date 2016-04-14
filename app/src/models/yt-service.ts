class YTService {

  static $inject = ['$q'];

  validationPattern: RegExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  urlPattern: string = "https://www.youtube.com/watch?v=:id";

  constructor(public $q: ng.IQService) { }

  validate(url: string): boolean {
    return this.validationPattern.test(url);
  }

  parseHash(url: string): string {
    if (!this.validate(url)) {
      return null;
    }
    return url.match(this.validationPattern)[2];
  };

  fetchVideo(url: string): ng.IPromise<IVideo> {
    return this.getData(this.parseHash(url));
  };

  getData(videoID: string): ng.IPromise<IVideo> {
    return this
      .$q((resolve, reject) => {
      $.getJSON(this.urlPattern.replace(':id', videoID))
        .then(resolve, reject);
    })
      .then((data: any) => {
      return {
        type: "youtube",
        videoID: videoID,
        title: data.title,
        thumb: data.thumbnail_url,
        author: data.author_name,
        url: "http://www.youtube.com/embed/" + videoID + "?autoplay=1"
      }
    })
      .catch(() => {
      return {
        error: 'AJAX getting youtube data failed'
      }
    })
  }

}

angular
  .module('ytApp')
  .service('ytService', YTService);
