const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');


// Compile Scss into Css
function style() {
    // 1. Where is my scss file
    return gulp.src("./scss/**/*.scss")
    // 2. pass file through sass compiler
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    // 3. Where do I save the compiled CSS?
    .pipe(gulp.dest("./app/css"))
    // 4. Stream changes to all browsers
    .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './app/'
        }
    });
    gulp.watch("./scss/**/*.scss", style);
    gulp.watch('./app/*.html').on('change', browserSync.reload);
    gulp.watch("./app/js/**/*.js").on('change', browserSync.reload);

}

exports.style = style;
exports.watch = watch;

