var gulp = require('gulp');
var sass = require('gulp-sass');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
var pug = require('gulp-pug');
var browserSync = require('browser-sync').create();
var SHOW_DETAILED_ERROR = false;

// Set the banner content
var banner = ['/*!\n',
	' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
	' * Copyright 2017-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
	' * Licensed under <%= pkg.license %> (<%=pkg.repository.url%>/LICENSE)\n',
	' */\n',
	''
].join('');

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function () {

	// Bootstrap
	gulp.src([
			'./node_modules/bootstrap/dist/**/*',
			'!./node_modules/bootstrap/dist/css/bootstrap-grid*',
			'!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
		])
		.pipe(gulp.dest('./vendor/bootstrap'))

	// Font Awesome
	gulp.src([
			'./node_modules/font-awesome/**/*',
			'!./node_modules/font-awesome/{less,less/*}',
			'!./node_modules/font-awesome/{scss,scss/*}',
			'!./node_modules/font-awesome/.*',
			'!./node_modules/font-awesome/*.{txt,json,md}'
		])
		.pipe(gulp.dest('./vendor/font-awesome'))

	// jQuery
	gulp.src([
			'./node_modules/jquery/dist/*',
			'!./node_modules/jquery/dist/core.js'
		])
		.pipe(gulp.dest('./vendor/jquery'))

	// jQuery Easing
	gulp.src([
			'./node_modules/jquery.easing/*.js'
		])
		.pipe(gulp.dest('./vendor/jquery-easing'))

});

// Compile SCSS
gulp.task('css:compile', function () {
	return gulp.src('./scss/**/*.scss')
		.pipe(sass.sync({
			outputStyle: 'expanded'
		}).on('error', sass.logError))
		.pipe(gulp.dest('./css'))
});

// Minify CSS
gulp.task('css:minify', ['css:compile'], function () {
	return gulp.src([
			'./css/*.css',
			'!./css/*.min.css'
		])
		.pipe(cleanCSS())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('./css'))
		.pipe(browserSync.stream());
});

// CSS
gulp.task('css', ['css:compile', 'css:minify']);

// Minify JavaScript
gulp.task('js:minify', function () {
	return gulp.src([
			'./js/*.js',
			'!./js/*.min.js'
		])
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('./js'))
		.pipe(browserSync.stream());
});

// JS
gulp.task('js', ['js:minify']);

// PUG TEMPLATE
// TODO check other task compatibility
gulp.task('views', function buildHTML() {
	return gulp.src('views/*.jade')
		.pipe(pug({
			// pretty: true
		}))
		.on('error', function (err) {
			if (SHOW_DETAILED_ERROR === false)
				err.stack = err.src = null;
			console.log("ERR", err);
			this.emit('end'); // Continue running gulp
		})
		.pipe(gulp.dest('./'))
});

// Default task
gulp.task('default', ['css', 'js', 'views', 'vendor']);

// Configure the browserSync task
gulp.task('browserSync', function () {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
});

// Dev task
gulp.task('dev', ['css', 'js', 'views', 'browserSync'], function () {
	gulp.watch('./scss/*.scss', ['css']);
	gulp.watch('./js/*.js', ['js']);
	gulp.watch('./views/*.jade', ['views']);
	gulp.watch('./*.html', browserSync.reload);
});
