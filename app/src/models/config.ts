class Config {

  thumbs: String;
  pagination: Number;
  thumbWidth: Number;
  thumbHeight: Number;
  videoWidth: Number;
  videoHeight: Number;
  pages: Number[];

  constructor() {
    Object.assign(this, {
      thumbs: "thumbs",
      pagination: 5,
      thumbWidth: 150,
      thumbHeight: 150,
      videoWidth: 480,
      videoHeight: 385,
      pages: [2,4,6,8,10],
    });
  }
}


angular
  .module('ytApp')
  .service('config', Config);
