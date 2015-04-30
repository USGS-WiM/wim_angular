// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var concat = require('gulp-concat')
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


var src = ['dist/src/**/*.js'];

// Concatenate & Minify JS
gulp.task('scripts', function () {
    return gulp.src(src)
        .pipe(concat('wim_angular.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('wim_angular.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});


// Default Taskgul
gulp.task('default', ['scripts']);