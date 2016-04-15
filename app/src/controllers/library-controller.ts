class LibraryController {

  static $inject = ['libraryService', '$location', 'videoService'];

  url: string = null;
  type: string = null;
  search: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 2;
  maxSize: number = 5; //Number of pager buttons to show
  movieLink: string = "";
  sortDirection: boolean = true; // true = ASC, false = DESC
  showModal: boolean = null;
  showFavourite: boolean = false;
  isList: boolean;
  videos: Model[] = this.libraryService.storage.videos;


  constructor(public libraryService: LibraryService,
    public $location: ng.ILocationService,
    public videoService: VideoService) {

    this.isList = false;
  }



  toggleFavourite(): void {
    this.showFavourite = !this.showFavourite;
  };

  showList(): boolean {
    return this.isList = true;
  }
  showTiles(): boolean {
    return this.isList = false;
  };

  isActive(route): boolean {
    return route === this.$location.path();
  };

  getLibraryLength(search: boolean) {
    return this.videos.filter((element: Model): any => {
      return (search) ? element.favourite === true : element;
    }).length;
  };

  eraseLibrary(): void {
    this.videos = this.libraryService.removeAll();
  };

  addFavourite(videoID: string): void {
    this.videos = this.libraryService.addFavourite(videoID);
  };

  deleteMovie(videoID: string): void {
    this.videos = this.libraryService.removeItem(videoID);
  };

  playVideo(movie: Model): void {
    this.videos = this.libraryService.increaseViewingCount(movie.videoID);
    this.toggleModal();
    this.url = movie.url;
    this.type = movie.type;
  };

  toggleModal(): void {
    this.showModal = !this.showModal;
  };

  setItemsPerPage(num: number): void {
    this.itemsPerPage = num;
    this.currentPage = 1; // reset to first page
  };

  getSortClass() {
    return {
      'glyphicon-sort-by-attributes': this.sortDirection,
      'glyphicon-sort-by-attributes-alt': !this.sortDirection
    };
  };

  toggleSort(): void {
    this.sortDirection = !this.sortDirection;
  };

  processInputForm(): void {
    var url = this.movieLink;
    var libraryService = this.libraryService;
    this.movieLink = "";
    var self = this;

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
  };





}

angular
  .module('ytApp')
  .controller('LibraryController', LibraryController)
