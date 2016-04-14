class Config {

  thumbs: String;
  pagination: Number;
  thumbWidth: Number;
  thumbHeight: Number;
  videoWidth: Number;
  videoHeight: Number;

  constructor() {
    this.thumbs = "thumbs";
    this.pagination = 5;
    this.thumbWidth = 150;
    this.thumbHeight = 150;
    this.videoWidth = 480;
    this.videoHeight = 385;
  }
}

interface IVideo {
  type: string;
  videoID: string;
  title: string;
  thumb: string;
  author: string;
  url: string;
  error: string;
}

interface IVideoService {
  validate(url: string): boolean;
  parseHash(url: string): string;
  fetchVideo(url: string): ng.IPromise<IVideo>;
  getData(videoID: string): ng.IPromise<IVideo>;

}


class VideoService {

  static $inject = ['$q', 'ytService', 'vimeoService'];

  services: IVideoService[];

  constructor(public $q: ng.IQService, ytService: IVideoService, vimeoService: IVideoService) {
    this.services = [
      ytService,
      vimeoService
    ]
  }

  init(url: string): ng.IPromise<IVideoService> {
    for (var i = 0; i < this.services.length; i++) {
      var service = this.services[i];
      if (service.validate(url)) {
        return this.$q.resolve(service);
      }
    }
    return this.$q.reject('invalid URL');
  }

  fetchVideo(url) {
    return this
      .init(url)
      .then(function(service) {
      return service.fetchVideo(url);
    });
  };

}

angular
  .module('ytApp')
  .service('videoService', VideoService);
