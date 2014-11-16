var gulp = require ('gulp'),
    notify = require('gulp-notify'),
    uglifyJS = require ('gulp-uglify'),
    livereload = require('gulp-livereload');

gulp.task ('default', function () {
  livereload.listen ();

  var watchFiles = ['./root/*.html', './root/system/**/*.html', './root/system/**/*.css', './root/system/**/*.js'].forEach (function (t) {
    gulp.watch (t).on ('change', function () {
      gulp.run ('reload');
    });
  });
});


gulp.task ('reload', function () {
  livereload.changed ();
  // gulp.src ('').pipe (notify ('✖ ReLoad Browser! ✖'));
  console.info ('\nReLoad Browser!\n');
});
gulp.task ('js-uglify', function () {
    gulp.src ('./root/system/**/*.js')
    .pipe(uglifyJS ())
    .pipe (gulp.dest ('./root/system/'));
});