/*
* Dependencias
*/

var gulp = require('gulp')
var browserify = require('browserify') 
var jadeify = require('jadeify')
var babelify = require('babelify')
var buffer = require('vinyl-buffer')
var source = require('vinyl-source-stream')
var conc = require('gulp-concat')
var uglify = require('gulp-uglify')
var comp = require('gulp-compressor')

//tares de gulp  compilar y tarea concatena

gulp.task('compilar', function (){
	return browserify({ 
		entries:'lib/main/index.js',
		transform: [ babelify]
	})
	.bundle()
	.pipe(source('index.js'))
	.pipe(buffer())
	.pipe(gulp.dest('./'))
})


gulp.task('concatena',function (){
	return gulp.src('lib/*/*.js')
	.pipe(conc('index.js'))
	//.pipe(uglify())
	.pipe(gulp.dest('./'))
})

gulp.task('ugli',function (){
	gulp.src('./lib/main/*.js')
	.pipe(uglify({
	}))
	.pipe(gulp.dest('./public/js/'))
})

gulp.task('css',function (){
	gulp.src('./lib/main/*.css')
	.pipe(conc('index.css'))
	.pipe(comp())
	.pipe(gulp.dest('./public/css/'))
})
