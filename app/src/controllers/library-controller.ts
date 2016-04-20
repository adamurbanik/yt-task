// --save-dev -D
// --save -S
//
// npm i -D gulp = npm install gulp --save-dev
// npm i -S gulp = npm install gulp --save



class LibraryController {

  static $inject = ['libraryService', '$location', 'videoService', 'config'];

  url: string = null;
  type: string = null;
  search: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 2;
  maxSize: number = 5; //Number of pager buttons to show
  movieLink: string = "";
  sortDirection: boolean = false; // true = ASC, false = DESC
  showModal: boolean = null;
  showFavourite: boolean = false;
  isList: boolean = false;
  videos: Model[] = this.libraryService.storage.videos;



  constructor(public libraryService: LibraryService,
              public $location: ng.ILocationService,
              public videoService: VideoService,
              public config: Config) { }

  toggleFavourite(): void {
    this.showFavourite = !this.showFavourite;
  }

  showList(): void {
    this.isList = true;
  }
  showTiles(): void {
    this.isList = false;
  }

  isActive(route): boolean {
    return route === this.$location.path();
  }

  getLibraryLength(search: boolean) {
    return this.videos.filter((element: Model): any => {
      return (search) ? element.favourite === true : element;
    }).length;
  }

  eraseLibrary(): void {
    this.videos = this.libraryService.removeAll();
  }

  addFavourite(videoID: string): void {
    this.videos = this.libraryService.addFavourite(videoID);
  }
  
  dislikeMovie(videoID: string): void {
    this.videos = this.libraryService.dislikeMovie(videoID);
  }

  deleteMovie(videoID: string): void {
    this.videos = this.libraryService.removeItem(videoID);
  }

  playVideo(movie: Model): void {
    this.videos = this.libraryService.increaseViewingCount(movie.videoID);
    this.toggleModal();
    this.url = movie.url;
    this.type = movie.type;
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  setItemsPerPage(num: number): void {
    console.log(num);
    this.itemsPerPage = num;
    this.currentPage = 1; // reset to first page
  }

  processInputForm(movieLink: string): void {
    let url = this.movieLink;
    let libraryService = this.libraryService;
    this.movieLink = "";
    let self = this;

    this
      .videoService
      .fetchVideo(url)
      .then(onSucces, onFail);

    function onSucces(video) {
      self.videos = libraryService.addItem(video);
    }

    function onFail(err) {
      console.log(err);
    }
  }





}

angular
  .module('ytApp')
  .controller('LibraryController', LibraryController);
