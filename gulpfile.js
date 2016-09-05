/*"del": "^1.1.1",
    "gulp": "^3.9.0",
    "gulp-autoprefixer": "^3.0.1",
    "gulp-babel": "^6.1.1",
    "gulp-cache": "^0.4.2",
    "gulp-cssnano": "^2.0.0",
    "gulp-eslint": "^2.0.0",
    "gulp-htmlmin": "^1.3.0",
    "gulp-if": "^2.0.0",
    "gulp-imagemin": "^2.2.1",
    "gulp-load-plugins": "^0.10.0",
    "gulp-plumber": "^1.0.1",
    "gulp-sass": "^2.0.0",
    "gulp-size": "^1.2.1",
    "gulp-sourcemaps": "^1.5.0",
    "gulp-uglify": "^1.1.0",
    "gulp-useref": "^3.0.0",
    "main-bower-files": "^2.5.0",
    "wiredep": "^2.2.2"*/
var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var sass         = require('gulp-sass');
var plumber      = require('gulp-plumber');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');


var reload      = browserSync.reload;
// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        port: 9000,
        server: "./app"
    });

    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("app/**/*.html").on('change', reload);
});

// scss编译后的css将注入到浏览器里实现更新
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass.sync({
          outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer({browsers: ["last 3 version", "> 10%", "> 1% in US", "ie 8", "ie 7","Firefox >= 20"]}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("app/css"))
        .pipe(reload({stream: true}));
});

gulp.task('default', ['serve']);

