interface IVimeoDataModel extends IVideoModel { }

interface IVimeoDataSource {
  data: IVimeoDataSourceData[];
}

interface IVimeoDataSourceData {
  id: string;
  title: string;
  thumbnail_medium: string;
  user_name: string;
}

class VimeoService {

  static $inject = ['$q', '$http'];

  validationPattern: RegExp = /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;
  urlPattern: string = "https://vimeo.com/api/v2/video/:id.json";
  $http: ng.IHttpService;
  $q: ng.IQService;

  constructor($q: ng.IQService, $http: ng.IHttpService) {
    this.$q = $q;
    this.$http = $http;
  }

  validate(url: string): boolean {
    return this.validationPattern.test(url);
  }

  parseHash(url: string): string {
    if (!this.validate(url)) {
      return null;
    }
    return url.match(this.validationPattern)[3];
  }

  fetchVideo(url: string): ng.IPromise<IVimeoDataModel> {
    return this.getData(this.parseHash(url));
  }

  getData(videoID: string): ng.IPromise<IVimeoDataModel> {
    return this
      .$http({
        method: 'GET',
        url: this.urlPattern.replace(':id', videoID)
      })
      .then((data: IVimeoDataSource) => {
        let videoModel = <IVimeoDataModel>{};

        const source = data.data[0];

        videoModel.type = 'vimeo';
        videoModel.videoID = source.id;
        videoModel.title = source.title;
        videoModel.thumb = source.thumbnail_medium;
        videoModel.author = source.user_name;
        // videoModel.url = `"http://player.vimeo.com/video/${videoID}?api=1&player_id=playerVimeo"`;
        videoModel.url = "http://player.vimeo.com/video/" + videoID + "?api=1&player_id=playerVimeo"

        return videoModel;
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
