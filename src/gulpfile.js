var gulp = require('gulp');
var runSequence = require('run-sequence');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var cssnano = require('gulp-cssnano');
var plumber = require('gulp-plumber');

var scssFiles = ['./wwwroot/assets/scss/**/*.scss'];
var scssMain = ['./wwwroot/assets/scss/main.scss'];
var pathStyleDest = './wwwroot/dist/css';

// SASS
gulp.task('style', function () {
  return gulp.src(scssMain)
    .pipe(plumber({errorHandler: notify.onError("Style Build Error: <%= error.message %>")}))
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer('last 4 version'))
    .pipe(sourcemaps.write())
    .on('error', onError)
    .pipe(gulp.dest(pathStyleDest));
});

gulp.task('style-build', function () {
  return gulp.src(scssMain)
    .pipe(plumber({errorHandler: notify.onError("Style Build Error: <%= error.message %>")}))
    .pipe(sass())
    .on('error', onError)
    .pipe(autoprefixer('last 4 version'))
    .pipe(cssnano())
    .pipe(gulp.dest(pathStyleDest));
});

// Watcher
gulp.task('watch', () => {
  gulp.watch(scssFiles, function(){
    runSequence('style', ['notify']);
  });
});

// Build for prod
gulp.task('build', function(callback) {
  runSequence(['style-build'], callback);
});

// Default
gulp.task('default', done => {
  runSequence(['style', 'watch'], done);
});

///////////////////////////////////////////////////////////
// Helpers
function onError(error) {
    console.log(error.toString());
    this.emit('end');
}

gulp.task('notify', function () {
  return gulp.src('')
    .pipe(notify({message: 'DRAKARYS!!!', onLast: true}));
});
