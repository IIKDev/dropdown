'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const del = require('del');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('styles', function(){
    return gulp.src('./src/scss/index.scss')
        .pipe(gulpif(isDevelopment, sourcemaps.init()))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpif(isDevelopment, sourcemaps.write()))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('clean', function() {
    return del('./public/css');
});

gulp.task('build', gulp.series('clean', 'styles'));

gulp.watch('./src/scss/**/*.*', gulp.series('styles'));
