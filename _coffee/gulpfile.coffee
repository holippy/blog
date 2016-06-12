gulp = require 'gulp'
coffee = require 'gulp-coffee'
sass = require 'gulp-sass'
jade = require 'gulp-jade'
plumber = require 'gulp-plumber'
minifyCss = require 'gulp-minify-css'
concat = require 'gulp-concat'
sourcemaps = require 'gulp-sourcemaps'
bower = require 'main-bower-files'
connect = require 'gulp-connect'
browserify = require 'browserify'
rename = require 'gulp-rename'
uglify = require 'gulp-uglify'
filter = require 'gulp-filter'
babelify = require("babelify")
source = require 'vinyl-source-stream'
reactify = require 'reactify'
buffer = require('vinyl-buffer')

###
gulp.js用
###

gulp.task 'coffee', ()->
		gulp.src('_coffee/*.coffee')
		.pipe plumber()
		.pipe coffee()
		.pipe gulp.dest('./')

###
browserify
###

# gulp.task 'browserify', ()->
# 		browserify
# 			entries: ['_js/app.js']
# 			transform: [reactify]
# 		.bundle()
# 		.pipe source 'app.js'
# 		.pipe gulp.dest 'dist/assets/js'

gulp.task 'babelify', ()->
	browserify(
			entries: "_js/app.js"
			extensions: [".js"]
		)
		.transform(babelify)
		.bundle()
		.on("error", (err)->
			console.log("Error : " + err.message);
			this.emit("end");
		)
		.pipe(source("app.js"))
		.pipe(gulp.dest("./dist/assets/js/"));

gulp.task 'jsProduction', ()->
	browserify(
			entries: "_js/app.js"
			extensions: [".js"]
		)
		.transform(babelify)
		.bundle()
		.on("error", (err)->
			console.log("Error : " + err.message);
			this.emit("end");
		)
		.pipe(source("app.js"))
		.pipe(buffer())
		.pipe(rename('app.js'))
		.pipe(uglify())
		.pipe(gulp.dest("./dist/assets/js/"));

###
coffee
###

# gulp.task 'coffee', ()->
# 	browserify
# 		entries: [
# 			'_coffee/app.coffee'
# 			'_coffee/_bg.coffee'
# 		]
# 		extensions: ['.coffee', '.js']

# 	.transform 'coffeeify'
# 	.bundle()
# 	.pipe plumber()
# 	.pipe source 'app.js'
# 	.pipe gulp.dest 'dist/assets/js/'

###
sass
###

gulp.task 'sass', ()->
		gulp.src '_sass/**/*.scss'
		.pipe(plumber(
			errorHandler: (err)->
				console.log(err.messageFormatted);
				this.emit('end');
		))
		.pipe sass()
		.pipe sourcemaps.init()
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
bowerのライブラリを結合
###

gulp.task 'bowerJS', ->
	jsFilter = filter '**/*.js'
	gulp
	.src bower()
	.pipe jsFilter
	.pipe uglify(
		preserveComments: 'some'
	)
	.pipe concat 'lib.js'
	.pipe gulp.dest 'dist/assets/js/'

###
connect
###

gulp.task 'connect', ->
	connect.server
		root: 'dist',
		port: 8080,
		livereload: true

###
html リロード
###

gulp.task 'reload', ->
	gulp.src 'dist/**/*.html'
	.pipe connect.reload()

###
watchタスク　
###

gulp.task 'watch', ()->
	gulp.watch '_coffee/*.coffee', ['coffee']
	gulp.watch '_sass/**/*.scss', ['sass']
	gulp.watch '_js/**/*.js', ['babelify']
	gulp.watch '_js/**/*.jsx', ['babelify']
	gulp.watch '_jade/**/*.jade', ['jade']
	gulp.watch 'dist/**/*.html', ['reload']
	gulp.watch 'dist/**/*.css', ['reload']
	gulp.watch 'dist/**/*.js', ['reload']

gulp.task 'default', ['connect', 'watch', 'coffee', 'sass', 'jade']