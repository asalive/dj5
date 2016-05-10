// global.hostname = "localhost";

var gulp 					 = require('gulp'),
			sass 				 = require('gulp-sass'),
			autoprefixer = require('gulp-autoprefixer'),
			minifycss 	 = require('gulp-minify-css'),
			browserSync  = require('browser-sync'),
			rename 			 = require('gulp-rename');

// gulp.task('express', function() {
// 	var express = require('express');
// 	var app = express();
// 	app.use(require('connect-livereload')({port: 35729}));
// 	app.use(express.static(__dirname + '/app'));
// 	app.listen('80', hostname);
// });

// var tinylr;
// gulp.task('livereload', function() {
// 	tinylr = require('tiny-lr')();
// 	tinylr.listen(35729);
// });


// function notifyLiveReload(event) {
// 	var fileName = require('path').relative(__dirname, event.path);
// 	tinylr.changed({
// 		body: {
// 			files: [fileName]
// 		}
// 	});
// }


gulp.task('browser-sync', function() {
  browserSync({
    // здесь задаём параметры
    server: {
      baseDir: 'app' // папка, выступающая как сервер
    },
    notify: false,
  });
});



gulp.task('styles', function () {
	gulp.src('sass/*.sass')
	.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}).on('error', sass.logError))
	.pipe(rename({suffix: '.min', prefix : '_'}))
	.pipe(autoprefixer({
		browsers: ['last 15 versions'],
		cascade: false
	}))
	.pipe(minifycss())
	.pipe(gulp.dest('app'));
});

gulp.task('watch', function() {
	gulp.watch('sass/*.sass', ['styles']);
	gulp.watch('app/*.css', browserSync.reload);
  gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/*.js', browserSync.reload);
});

gulp.task('default', ['styles', 'browser-sync', 'watch'], function() {

});
