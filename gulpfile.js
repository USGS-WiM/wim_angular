// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


var src = ['dist/wim_angular.js'];

// Concatenate & Minify JS
gulp.task('scripts', function () {
    return gulp.src(src)
        .pipe(rename('wim_angular.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});


// Default Taskgul
gulp.task('default', ['scripts']);