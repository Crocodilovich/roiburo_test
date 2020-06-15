const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const rollup = require('rollup');

sass.compiler = require('node-sass');

gulp.task('sass', function () {
  return gulp.src('source/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
});

gulp.task('script', function() {
  return rollup.rollup({
    input: 'source/js/script.js',
  }).then(bundle => {
    return bundle.write({
      file: 'build/js/script.js',
      format: 'es'
    });
  });
});

gulp.task('dev', function() {
  browserSync.init({
      server: {
          baseDir: "build"
      }
  });

  gulp.watch('build/**/*.html').on('change', browserSync.reload);
  gulp.watch('source/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('source/js/**/*.js', gulp.series('script')).on('change', browserSync.reload);
});