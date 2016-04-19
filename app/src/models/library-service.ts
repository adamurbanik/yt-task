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
    Object.assign(this, {
      type: videoData.type,
      title: videoData.title,
      date: new Date().toISOString().slice(0, 10),
      dateNumber: Date.now(),
      thumb: videoData.thumb,
      author: videoData.author,
      favourite: false,
      videoID: videoData.videoID,
      favourCount: 0,
      viewingCount: 0,
      url: videoData.url,
    });
  }

}


class LibraryService {

  static $inject = ['appStorage'];

  constructor(public storage: AppStorage) { }

  createModel(videoData: any): Model {
    return new Model(videoData);
  }

  addItem(videoData: any): Model[] {
    return this.storage.addItem(this.createModel(videoData));
  };

  removeItem(videoID: string): Model[] {
    let index = this.getIndexByVideoID(videoID);
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
    let index = this.getIndexByVideoID(videoID);
    return this.storage.addFavourite(index);
  };

  increaseViewingCount(videoID: string): Model[] {
    let index = this.getIndexByVideoID(videoID);
    return this.storage.increaseViewingCount(index);
  };

}

angular
  .module('ytApp')
  .service('libraryService', LibraryService);
