var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

gulp.task('sass', function(){
	return gulp.src('app/components/styles/main.scss')
		.pipe(sass()) // Using gulp-sass
		.on('error', sass.logError)
		.pipe(gulp.dest('app/components/styles'))
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

	browserSync.init({
		server: "./app"
	});

	gulp.watch("app/components/styles/*.scss", ['sass']).on('change', browserSync.reload);
	gulp.watch("app/**/*.js").on('change', browserSync.reload);
	gulp.watch("app/**/*.html").on('change', browserSync.reload);
});