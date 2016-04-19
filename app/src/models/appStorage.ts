class AppStorage {

  static $inject = ['localStorage'];

  videos: Model[];

  constructor(public localStorage: LocalStorage) {
    this.videos = localStorage.getStorage();

  }

  addItem(model: Model): Model[] {
    this.videos.push(model);
    this.localStorage.updateStorage(this.videos);
    return this.videos;
  };

  removeItem(index: number): Model[] {
    this.videos.splice(index, 1);
    this.localStorage.updateStorage(this.videos);
    return this.videos;
  };

  removeAll(): Model[] {
    this.videos = [];
    this.localStorage.updateStorage(this.videos);
    return this.videos;
  };

  addFavourite(index: number): Model[] {
    this.videos[index].favourite = true;
    this.videos[index].favourCount++;
    this.localStorage.updateStorage(this.videos);
    return this.videos;
  };

  increaseViewingCount(index: number): Model[] {
    this.videos[index].viewingCount++;
    this.localStorage.updateStorage(this.videos);
    return this.videos;
  };


}

angular
  .module('ytApp')
  .service('appStorage', AppStorage);
