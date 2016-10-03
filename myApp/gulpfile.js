var gulp = require('gulp'),
    gutil = require('gulp-util'),
    bower = require('bower'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    sh = require('shelljs'),
	uglify=require('gulp-uglify');

var paths = {
  sass: [{src:'scss/**/*.scss',dest:'www/css/'}],  
  js: [{src:'www/js/**/*.js',dest:'www/dist/'}]
};

gulp.task('default', ['sass','minify','watchJs']);

/*gulp.task('sass', function(done) {
	  gulp.src('./scss/*.scss')
	    .pipe(sass({
	      errLogToConsole: true
	    }))
	    .pipe(gulp.dest('./www/css/'))
	    .pipe(minifyCss({
	      keepSpecialComments: 0
	    }))
	    .pipe(rename({ extname: '.min.css' }))
	    .pipe(gulp.dest('./www/css/'))
	    .on('end', done);
	});
gulp.task('watch', function() {
	  gulp.watch(paths.sass, ['sass']);
	});*/


gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest(paths.sass[0].dest))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(paths.sass[0].dest))
    .on('end', done);
});


gulp.task('minify',function(){
return gulp.src(paths.js[0].src)
 .pipe(concat('app.js'))
 .pipe(gulp.dest(paths.js[0].dest))
 .pipe(rename({ extname: '.min.js' }))
 //.pipe(uglify())
 .pipe(gulp.dest(paths.js[0].dest));
 });
 // Watch Our Files
gulp.task('watchJs',function(){
 gulp.watch(paths.js[0].src,['minify']);
 }); 


gulp.task('watch', function() {
  gulp.watch(paths.sass[0].src, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
