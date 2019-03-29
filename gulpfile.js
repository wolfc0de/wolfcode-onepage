const gulp = require('gulp');
const sass = require('gulp-sass'); 
const autoPrefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();


function compilerSass () {
    return gulp
    .src('assets/css/scss/*.scss')
    .pipe(sass())
    .pipe(autoPrefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.stream())
}

function browser () {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
}

function watch () {
    gulp.watch('assets/css/scss/*.scss', compilerSass)
    gulp.watch('./*.html').on('change', browserSync.reload)
}

gulp.task('browser-sync', browser)
gulp.task('sass', compilerSass)
gulp.task('watch', watch)
gulp.task('default', gulp.parallel('watch', 'browser-sync'))