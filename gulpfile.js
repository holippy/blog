(function() {
  var babelify, bower, browserify, coffee, concat, connect, filter, gulp, jade, minifyCss, plumber, reactify, rename, sass, source, sourcemaps, uglify;

  gulp = require('gulp');

  coffee = require('gulp-coffee');

  sass = require('gulp-sass');

  jade = require('gulp-jade');

  plumber = require('gulp-plumber');

  minifyCss = require('gulp-minify-css');

  concat = require('gulp-concat');

  sourcemaps = require('gulp-sourcemaps');

  bower = require('main-bower-files');

  connect = require('gulp-connect');

  browserify = require('browserify');

  rename = require('gulp-rename');

  uglify = require('gulp-uglify');

  filter = require('gulp-filter');

  babelify = require("babelify");

  source = require('vinyl-source-stream');

  reactify = require('reactify');


  /*
  gulp.js用
   */

  gulp.task('coffee', function() {
    return gulp.src('_coffee/*.coffee').pipe(plumber()).pipe(coffee()).pipe(gulp.dest('./'));
  });


  /*
  browserify
   */

  gulp.task('babelify', function() {
    return browserify({
      entries: "_js/app.js",
      extensions: [".js"]
    }).transform(babelify).bundle().on("error", function(err) {
      console.log("Error : " + err.message);
      return this.emit("end");
    }).pipe(source("app.js")).pipe(gulp.dest("./dist/assets/js/"));
  });


  /*
  coffee
   */


  /*
  sass
   */

  gulp.task('sass', function() {
    return gulp.src('_sass/**/*.scss').pipe(plumber({
      errorHandler: function(err) {
        console.log(err.messageFormatted);
        return this.emit('end');
      }
    })).pipe(sass()).pipe(sourcemaps.init()).pipe(minifyCss()).pipe(sourcemaps.write('map')).pipe(gulp.dest('dist/assets/css/'));
  });


  /*
  jade
   */

  gulp.task('jade', function() {
    return gulp.src('_jade/**/*.jade', {
      base: '_jade'
    }).pipe(plumber()).pipe(jade({
      pretty: true
    })).pipe(gulp.dest('dist'));
  });


  /*
  bowerのライブラリを結合
   */

  gulp.task('bowerJS', function() {
    var jsFilter;
    jsFilter = filter('**/*.js');
    return gulp.src(bower()).pipe(jsFilter).pipe(uglify({
      preserveComments: 'some'
    })).pipe(concat('lib.js')).pipe(gulp.dest('dist/assets/js/'));
  });


  /*
  connect
   */

  gulp.task('connect', function() {
    return connect.server({
      root: 'dist',
      port: 8080,
      livereload: true
    });
  });


  /*
  html リロード
   */

  gulp.task('reload', function() {
    return gulp.src('dist/**/*.html').pipe(connect.reload());
  });


  /*
  watchタスク
   */

  gulp.task('watch', function() {
    gulp.watch('_coffee/*.coffee', ['coffee']);
    gulp.watch('_sass/**/*.scss', ['sass']);
    gulp.watch('_js/**/*.js', ['babelify']);
    gulp.watch('_js/**/*.jsx', ['babelify']);
    gulp.watch('_jade/**/*.jade', ['jade']);
    gulp.watch('dist/**/*.html', ['reload']);
    gulp.watch('dist/**/*.css', ['reload']);
    return gulp.watch('dist/**/*.js', ['reload']);
  });

  gulp.task('default', ['connect', 'watch', 'coffee', 'sass', 'jade']);

}).call(this);
