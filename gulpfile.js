var gulp = require('gulp'),
  connect = require('gulp-connect'),
  concat = require('gulp-concat'),
  less = require('gulp-less');

gulp.task('css', function () {
  gulp.src('./app/css/style.css')
    .pipe(less())
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./public/css'))
    .pipe(connect.reload());
});

gulp.task('css-vendor', function () {
  gulp
    .src([
      "./bower_components/bootstrap/dist/css/bootstrap.min.css",
      "./bower_components/bootstrap/dist/css/bootstrap-theme.min.css"
    ])
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('bower', function () {
  gulp.src([
  // "./bower_components/lodash/dist/lodash.js",
    "./bower_components/jquery/dist/jquery.js",
    "./bower_components/bootstrap/dist/js/bootstrap.js",
    "./bower_components/angular/angular.js",
    "./bower_components/angular-animate/angular-animate.js",
    "./bower_components/angular-ui-router/release/angular-ui-router.js",
    "./bower_components/angular-bootstrap/ui-bootstrap.js",
    "./bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
  ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('js', function () {
  gulp.src([
    './app/src/app.js',
    './app/src/**/*.js'
  ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./public/js/'))
    .pipe(connect.reload());
});

gulp.task('connect', function () {
  connect.server({
    root: 'public',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('./app/**/*.html')
    .pipe(gulp.dest('public'))
    .pipe(connect.reload());
});

gulp.task('fonts', function () {
  gulp.src([
    'bower_components/bootstrap/fonts/*',
    './app/fonts/**/*'
  ])
    .pipe(gulp.dest('public/fonts'));
});

gulp.task('images', function () {
  gulp.src('./app/images/*.png')
    .pipe(gulp.dest('public/images'));
});

gulp.task('watch', function () {
  gulp.watch(['./app/**/*.html'], ['html']);
  gulp.watch(['./app/**/*.js'], ['js']);
  gulp.watch(['./app/**/*.less'], ['less']);
});

// gulp.task('default', ['html', 'fonts', 'css-vendor', 'js', 'bower', 'less', 'connect', 'watch']);
gulp.task('default', ['html', 'fonts', 'css-vendor', 'js', 'bower', 'css', 'connect', 'watch']);