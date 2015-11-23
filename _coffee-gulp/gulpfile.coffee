gulp = require 'gulp'
coffee = require 'gulp-coffee'
sass = require 'gulp-sass'
jade = require 'gulp-jade'
plumber = require 'gulp-plumber'
minifyCss = require 'gulp-minify-css'
sourcemaps = require 'gulp-sourcemaps'

###
gulp.js用
###

gulp.task 'coffee-gulp', ()->

		gulp.src('_coffee-gulp/*.coffee')
		.pipe coffee()
		.pipe gulp.dest('./')

###
coffee
###

gulp.task 'coffee', ()->
		gulp.src('_coffee/*.coffee')
		.pipe plumber()
		.pipe coffee()
		.pipe gulp.dest('dist/assets/js')


###
sass
###

gulp.task 'sass', ()->
		gulp.src '_sass/**/*.scss'
		.pipe plumber()
		.pipe sourcemaps.init()
		.pipe sass()
		.pipe minifyCss()
		.pipe sourcemaps.write 'map'
		.pipe gulp.dest 'dist/assets/css/'

###
jade
###

gulp.task 'jade', ()->
		gulp.src '_jade/**/*.jade', {base: '_jade' }
		.pipe plumber()
		.pipe jade pretty: true
		.pipe gulp.dest 'dist'


###
watchタスク　
###

gulp.task 'watch', ()->
	gulp.watch '_coffee-gulp/*.coffee', ['coffee-gulp']
	gulp.watch '_coffee/*.coffee', ['coffee']
	gulp.watch '_sass/**/*.scss', ['sass']
	gulp.watch '_jade/**/*.jade', ['jade']

gulp.task 'default', ['watch', 'coffee-gulp', 'coffee', 'sass', 'jade']