(function () {
  'use strict';

  var LibraryController = function () {

    LibraryController.$inject = ['libraryService', '$location', 'videoService', 'config'];

    function LibraryController(libraryService, $location, videoService, config) {

      this.vm = {};

      this.videoService = videoService;
      this.url = null;
      this.type = null;
      this.config = config;
      this.libraryService = libraryService;
      this.$location = $location;
      this.search = false;
      this.currentPage = 1;
      this.itemsPerPage = 2;
      this.maxSize = 5; //Number of pager buttons to show
      this.movieLink = "";
      this.sortDirection = true; // true = ASC, false = DESC
      this.showModal = null;

// some commments added
    }

    LibraryController.prototype.isActive = function isActive(route) {
      return route === this.$location.path();
    };

    LibraryController.prototype.getLibraryLength = function getLibraryLength(search) {
      return this.libraryService.videos.filter(function (element) {
        return search ? element.favourite === true : element;
      }).length;
    };

    LibraryController.prototype.eraseLibrary = function eraseLibrary() {
      this.libraryService.removeAll();
    };

    LibraryController.prototype.addFavourite = function addFavourite(videoID) {
      this.libraryService.addFavourite(videoID);
    };

    LibraryController.prototype.deleteMovie = function deleteMovie(videoID) {
      this.libraryService.removeItem(videoID);
    };

    LibraryController.prototype.playVideo = function playVideo(movie) {
      movie.viewingCount++;
      this.libraryService.sync();
      this.toggleModal();
      this.url = movie.url;
      this.type = movie.type;
      console.log(movie);
    };

    LibraryController.prototype.toggleModal = function () {
      this.showModal = !this.showModal;
    };

    LibraryController.prototype.setItemsPerPage = function setItemsPerPage(num) {
      this.itemsPerPage = num;
      this.currentPage = 1; // reset to first page
    };

    LibraryController.prototype.getSortClass = function getSortClass() {
      return {
        'glyphicon-sort-by-attributes': this.sortDirection,
        'glyphicon-sort-by-attributes-alt': !this.sortDirection
      };
    };

    LibraryController.prototype.toggleSort = function toggleSort() {
      this.sortDirection = !this.sortDirection;
    };

    LibraryController.prototype.processInputForm = function processInputForm() {
      var url = this.movieLink;
      var libraryService = this.libraryService;
      this.movieLink = "";

      this
        .videoService
        .fetchVideo(url)
        .then(onSucces, onFail);

      function onSucces(video) {
        libraryService.addItem(video);
      }

      function onFail(err) {
        console.log(err);
      }
    };

    return LibraryController;
  }();

  angular
    .module('ytApp')
    .controller('LibraryController', LibraryController)
    .value('config', {
      thumbs: "thumbs",
      pagination: 5,
      thumbWidth: 150,
      thumbHeight: 150,
      videoWidth: 480,
      videoHeight: 385
    });

})();
