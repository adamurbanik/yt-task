class Config {

  thumbs: String;
  pagination: Number;
  thumbWidth: Number;
  thumbHeight: Number;
  videoWidth: Number;
  videoHeight: Number;
  pages: Number[];

  constructor() {
    this.thumbs = "thumbs";
    this.pagination = 5;
    this.thumbWidth = 150;
    this.thumbHeight = 150;
    this.videoWidth = 480;
    this.videoHeight = 385;
    this.pages = [2, 4, 6, 8, 10];
  }
}


angular
  .module('ytApp')
  .service('config', Config);
