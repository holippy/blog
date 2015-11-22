(function() {
  var coffee, gulp;

  gulp = require('gulp');

  coffee = require('gulp-coffee');

  gulp.task('watch', function() {
    return gulp.watch('_coffee/*.coffee', ['coffee']);
  });

  gulp.task('coffee-gulp', function() {
    return gulp.watch('_coffee-gulp/*.coffee', function() {
      return gulp.src('_coffee-gulp/*.coffee').pipe(coffee()).pipe(gulp.dest('./'));
    });
  });

  gulp.task('coffee', function() {
    return gulp.watch('_coffee/*.coffee', function() {
      return gulp.src('_coffee/*.coffee').pipe(coffee()).pipe(gulp.dest('dist/assets/js'));
    });
  });

  gulp.task('default', ['watch', 'coffee-gulp', 'coffee']);

}).call(this);
