(function() {
  var bower, browserify, coffee, concat, connect, filter, gulp, jade, minifyCss, plumber, rename, sass, source, sourcemaps, uglify;

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

  source = require('vinyl-source-stream');


  /*
  gulp.js用
   */

  gulp.task('gulpJS', function() {
    return gulp.src('_coffee-gulp/*.coffee').pipe(coffee()).pipe(gulp.dest('./'));
  });


  /*
  browserify
   */


  /*
  coffee
   */

  gulp.task('coffee', function() {
    return browserify({
      entries: ['_coffee/app.coffee'],
      extensions: ['.coffee', '.js']
    }).transform('coffeeify').bundle().pipe(source('app.js')).pipe(gulp.dest('dist/assets/js/'));
  });


  /*
  sass
   */

  gulp.task('sass', function() {
    return gulp.src('_sass/**/*.scss').pipe(plumber()).pipe(sourcemaps.init()).pipe(sass()).pipe(minifyCss()).pipe(sourcemaps.write('map')).pipe(gulp.dest('dist/assets/css/'));
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
    gulp.watch('_coffee-gulp/*.coffee', ['gulpJS']);
    gulp.watch('_coffee/*.coffee', ['coffee']);
    gulp.watch('_sass/**/*.scss', ['sass']);
    gulp.watch('_jade/**/*.jade', ['jade']);
    return gulp.watch('dist/**/*.html', ['reload']);
  });

  gulp.task('default', ['connect', 'watch', 'coffee', 'sass', 'jade']);

}).call(this);
