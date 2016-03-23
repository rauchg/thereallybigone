var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');

// A detailed debugging task to get more output
// Call it with 'gulp debug' to start a watcher
gulp.task('styles-devdebug', function() {
    gulp.src('source-sass/app.scss')
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./source/assets/stylesheets/'));
});
gulp.task('debug',function() {
    gulp.watch('source-sass/**',['styles-devdebug']);
});

// This is stripped back with minimal debugging so that it's faster to compile
gulp.task('default', function() {
    gulp.src('source-sass/app.scss')
      .pipe(sass())
      .pipe(gulp.dest('./source/assets/stylesheets/'));
});
//Call it with 'gulp watch' on the command line to start a watcher
gulp.task('watch',function() {
    gulp.watch('source-sass/**',['default']);
});

// This is the dist task, for the live server. Call it with 'gulp dist'
gulp.task('dist', function() {
    gulp.src('source-sass/app.scss')
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(gulp.dest('./source/assets/stylesheets/'));
});
