const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins'); 
const browserSync = require('browser-sync'); 
const del = require('del');  
const wiredep = require('wiredep').stream; 
const $ = gulpLoadPlugins();
const reload = browserSync.reload;

//编译sass文件
gulp.task('styles', () => {
  return gulp.src('app/styles/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init()) 
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ["last 3 version", "> 10%", "> 1% in US", "ie 8", "ie 7","Firefox >= 20"]}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(".tmp/styles"))
    .pipe(reload({stream: true}));
});

//编译es6到es5
gulp.task('scripts', () => {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(reload({stream: true}));
});

//js语法风格统一与bdd单元测试，单元测试这里不配置，若配置查看yeoman
function lint(files, options) {
  return gulp.src(files)
    .pipe(reload({stream: true, once: true}))
    .pipe($.eslint(options))
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('lint', () => {
  return lint('app/scripts/**/*.js', {
    fix: true
  })
    .pipe(gulp.dest('app/scripts'));
});
gulp.task('lint:test', () => {
  return lint('test/spec/**/*.js', {
    fix: true,
    env: {
      mocha: true   //摩卡单元测试用例，可
    }
  })
    .pipe(gulp.dest('test/spec/**/*.js'));
});


/*，合并、压缩js、html、css文件,在html标签中要加入下面的标签
<!-- build:css styles/combined.css -->
    ........
<!-- endbuild -->
<!-- build:js scripts/combined.js -->
    ........
<!-- endbuild -->*/
gulp.task('html', ['styles', 'scripts'], function() {
  return gulp.src('app/*.html')
    .pipe($.useref({searchPath: ['.tmp', 'app', '.']}))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cssnano({
      safe: true,
      autoprefixer: false
    })))
    .pipe($.if('*.html', $.htmlmin({
      collapseWhitespace: true
    })))
    .pipe(gulp.dest('dist'));
});

//压缩图片，还可以使用其它的插件的哦，这个插件不怎么好用
gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    })))
    .pipe(gulp.dest('dist/images'));
});

//将bower中安装的字体图标移到到目录中
gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
    .concat('app/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

//将app根目录下其它文件移到到dist中
gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});


//删除编译文件
gulp.task('clean', del.bind(null, ['.tmp', 'dist']));



// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', ['styles', 'scripts', 'fonts'], function() {
    browserSync.init({
        port: 9000,
        server: {
          baseDir: ['.tmp', 'app'], //定义.tmp和app为主目录，系统会查找相应的文件，例如写的是styles/one.css，但在app这个目录下并不存在这个文件，就会去.tmp中查找
          routes: {
            '/bower_components': 'bower_components'
          }
        }
    });

  gulp.watch([
    'app/*.html',
    'app/images/**/*',
    '.tmp/fonts/**/*'
  ]).on('change', reload);

  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch('app/fonts/**/*', ['fonts']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
});

//项目预览
gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

//单元测试
gulp.task('serve:test', ['scripts'], () => {
  browserSync({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/scripts': '.tmp/scripts',
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch('test/spec/**/*.js').on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});


/*将bower文件引入html文件中
      <!-- bower:css -->
      <!-- endbower -->
      <!-- bower:js -->
      <!-- endbower -->*/
gulp.task('wiredep', () => {
  // gulp.src('app/scss/*.scss')
  //   .pipe(wiredep({
  //     ignorePath: /^(\.\.\/)+/
  //   }))
  //   .pipe(gulp.dest('app/scss'));
  gulp.src('app/*.html')
    .pipe(wiredep({
      exclude: ['bootstrap-sass'],
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});


//build
gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});
gulp.task('default', ['clean'], () => {
  gulp.start('build');
});