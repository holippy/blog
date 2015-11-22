gulp = require 'gulp'
coffee = require 'gulp-coffee'


###
gulp.js用
###

gulp.task 'coffee-gulp', ()->

	return gulp.watch '_coffee-gulp/*.coffee', ()->

		gulp.src('_coffee-gulp/*.coffee')
		.pipe coffee()
		.pipe gulp.dest('./')

###
coffeeファイルをコンパイル
###

gulp.task 'coffee', ()->

	return gulp.watch '_coffee/*.coffee', ()->

		gulp.src('_coffee/*.coffee')
		.pipe coffee()
		.pipe gulp.dest('dist/assets/js')


###
watchタスク　
###

gulp.task 'watch', ()->
	gulp.watch '_coffee/*.coffee', ['coffee']

gulp.task 'default', ['watch', 'coffee-gulp', 'coffee']