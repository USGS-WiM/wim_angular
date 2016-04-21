// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var src = ['src/**/*.js', 'src/**/*.css'];
var tsDefsrc = ['src/**/**/*d.ts'];

// Concatenate & Minify JS
//TODO: refactor this, possibly using the gulp-order plugin to assure proper order for concat
// gulp.task('scripts', function () {
//     return gulp.src(src)
//         .pipe(concat('wim_angular.js'))
//         .pipe(gulp.dest('dist'))
//         .pipe(rename('wim_angular.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('dist'));
// });

gulp.task('compiled', function() {
    return gulp.src(src)
        .pipe(gulp.dest('dist'));
});

gulp.task('tsDefFiles', function () {
    return gulp.src(tsDefsrc)
        .pipe(gulp.dest('dist/typings'));
});

// Build
gulp.task('build', ['compiled', 'tsDefFiles']);

// Default Taskgul
gulp.task('default', ['build']);