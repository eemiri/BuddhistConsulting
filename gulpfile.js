const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');
const webpack = require('webpack-stream');
const named = require('vinyl-named');

// Aufgabe: HTML minifizieren und nach dist kopieren
gulp.task('html', () => {
  return gulp.src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});

// Aufgabe: SCSS zu CSS kompilieren, Autoprefixer anwenden und minifizieren
gulp.task('styles', () => {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
});

// Aufgabe: JS minifizieren
gulp.task('scripts', () => {
  return gulp.src('src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// Aufgabe: Bilder optimieren und nach dist kopieren
gulp.task('images', () => {
  return gulp.src('src/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});

// Optional: Webpack für React/JS-Bündelung (falls verwendet)
gulp.task('webpack', function() {
  return gulp.src('src/index.js')
    .pipe(named())
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('dist/'));
});

// Watch-Task: Beobachtet Änderungen an HTML, SCSS, JS und Bildern
gulp.task('watch', () => {
  gulp.watch('src/*.html', gulp.series('html'));
  gulp.watch('src/scss/**/*.scss', gulp.series('styles'));
  gulp.watch('src/js/**/*.js', gulp.series('scripts'));
  gulp.watch('src/images/**/*', gulp.series('images'));
});

// Default-Task: Führt alle Tasks einmal aus und startet dann den Watch-Task
gulp.task('default', gulp.series('html', 'styles', 'scripts', 'images', 'watch'));
