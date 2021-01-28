const gulp = require('gulp');
const concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
const plumber = require('gulp-plumber');
const remember = require('gulp-remember');
const browserSync = require('browser-sync').create();
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const minify = require('gulp-minify');
const autoprefixer = require('gulp-autoprefixer');
const rollup = require('gulp-rollup');
const less = require('gulp-less');

gulp.task('getAllHTML', () => {
  return gulp
    .src('src/markup/*.html')
    .pipe(concat('index.html'))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('public'));
});

gulp.task('getAllCSS', () => {
  return (
    gulp
      .src('src/styles/*.less', { since: gulp.lastRun('getAllCSS') })
      .pipe(
        plumber({
          errorHandler: notify.onError(function (err) {
            return {
              title: 'less',
              message: err.message,
            };
          }),
        })
      )
      .pipe(remember())
      .pipe(less())
      .pipe(
        autoprefixer({
          cascade: false,
        })
      )
      .pipe(gulp.dest('public/styles'))
      .pipe(concat('styles.css'))
      //.pipe(gulp.dest("public/styles"))
      .pipe(cssmin())
      .pipe(rename('styles.min.css'))
      .pipe(gulp.dest('public/styles'))
  );
});

gulp.task('clean', (done) => {
  del(['public/styles/*.css']);
  del(['public/styles.css']);
  del(['public/*.html']);
  del(['public/scripts/script-min.js']);
  done();
});

// gulp.task("copy", () => {
//     return gulp
//         .src("src/*.html")
//         .pipe(htmlmin({ collapseWhitespace: true }))
//         .pipe(gulp.dest("public"));
// });

gulp.task('getAllJS', () => {
  return gulp
    .src(['./src/scripts/*.js'])
    .pipe(
      plumber({
        errorHandler: notify.onError((err) => {
          return {
            title: 'js',
            message: err.message,
            err: err,
          };
        }),
      })
    )
    .pipe(
      rollup({
        input: './src/scripts/main.js',
        output: {
          format: 'iife',
        },
      })
    )
    .pipe(minify())
    .pipe(gulp.dest('./public/scripts'));
});

gulp.task('watch', () => {
  gulp.watch('src/styles/*.less', gulp.series('getAllCSS'));
  gulp.watch('src/markup/*.html', gulp.series('getAllHTML'));
  gulp.watch('src/scripts/*.js', gulp.series('getAllJS'));
});

gulp.task('build', gulp.series('clean', gulp.parallel('getAllCSS', 'getAllHTML', 'getAllJS')));

gulp.task('serve', () => {
  browserSync.init({
    server: 'public',
    tunnel: true,
  });

  gulp.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));
