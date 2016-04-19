interface IYTDataModel extends IVideoModel { }

interface IYTDataSource {
  title: string;
  thumbnail_url: string;
  author_name: string;
}

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

  fetchVideo(url: string): ng.IPromise<IYTDataModel> {
    return this.getData(this.parseHash(url));
  };

  getData(videoID: string): ng.IPromise<IYTDataModel> {
    return this
      .$q((resolve, reject) => {
        $.getJSON(this.urlPattern.replace(':id', videoID))
          .then(resolve, reject);
      })
      .then((data: IYTDataSource) => {
        let videoModel = <IYTDataModel>{};
        
        videoModel.type = "youtube";
        videoModel.videoID = videoID;
        videoModel.title = data.title;
        videoModel.thumb = data.thumbnail_url;
        videoModel.author = data.author_name;
        videoModel.url = "http://www.youtube.com/embed/" + videoID + "?autoplay=1";

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
