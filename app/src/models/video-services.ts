interface IVideoModel {
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
  fetchVideo(url: string): ng.IPromise<IVideoModel>;
  getData(videoID: string): ng.IPromise<IVideoModel>;
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
    for (let i = 0; i < this.services.length; i++) {
      let service = this.services[i];
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
  }

}

angular
  .module('ytApp')
  .service('videoService', VideoService);
