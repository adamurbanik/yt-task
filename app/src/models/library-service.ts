class Model {

  type: string;
  title: string;
  date: string;
  dateNumber: number;
  thumb: string;
  author: string;
  favourite: boolean;
  videoID: string;
  favourCount: number;
  viewingCount: number;
  url: string;

  constructor(videoData: any) {

    this.type = videoData.type;
    this.title = videoData.title;
    this.date = new Date().toISOString().slice(0, 10);
    this.dateNumber = Date.now();
    this.thumb = videoData.thumb;
    this.author = videoData.author;
    this.favourite = false;
    this.videoID = videoData.videoID;
    this.favourCount = 0;
    this.viewingCount = 0;
    this.url = videoData.url;

  }

}


class LibraryService {

  static $inject = ['storage'];

  constructor(public storage: AppStorage) {}

  createModel(videoData:any): Model {
    return new Model(videoData);
  }

  addItem(videoData: any): Model[] {
    return this.storage.addItem(this.createModel(videoData));
  };

  removeItem(videoID: string): Model[] {
    var index = this.getIndexByVideoID(videoID);
    return this.storage.removeItem(index);
  }

  removeAll(): Model[] {
    return this.storage.removeAll();
  };

  checkIfExists(videoID: string): boolean {
    return this
      .storage
      .videos
      .map(function(video) {
      return video.videoID;
    })
      .indexOf(videoID) !== -1;
  };

  getIndexByVideoID(videoID: string): number {
    return this
      .storage
      .videos
      .map(function(video) {
      return video.videoID;
    })
      .indexOf(videoID);
  };

  addFavourite(videoID: string): Model[] {
    var index = this.getIndexByVideoID(videoID);
    return this.storage.addFavourite(index);
  };

  increaseViewingCount(videoID: string): Model[] {
    var index = this.getIndexByVideoID(videoID);
    return this.storage.increaseViewingCount(index);
  };

}

  angular
    .module('ytApp')
    .service('libraryService', LibraryService);
