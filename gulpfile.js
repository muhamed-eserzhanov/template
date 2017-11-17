var gulp = require('gulp');
var concat = require('gulp-concat');
var nano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var imagemin = require('gulp-imagemin');
var minify = require('gulp-minify');
var browserSync = require('browser-sync');

var dev_path =
  {
    components: 'src/components/',
    js: 'src/js/',
    jade: 'src/jade/',
    sass: 'src/sass/',
    img: 'src/img/',
    font: 'src/fonts/'
  };


gulp.task('sass', function() {
  gulp.src([dev_path.sass + '**/*.scss'])
    .pipe(sass())
    .pipe(nano())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('font', function(){
  gulp.src([dev_path.font + '**/*'])
    .pipe(gulp.dest('dist/fonts/'))
});

gulp.task('jade', function(){
  gulp.src([dev_path.jade + '*.jade'])
    .pipe(jade({pretty: true}))
    .on('error', console.log)
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('compress', function(){
  gulp.src([dev_path.js + '*.js'])
    .pipe(minify())
    .pipe(gulp.dest('dist/js/'))
});

gulp.task('components', function(){
  gulp.src([dev_path.components + '**/*'])
    .pipe(gulp.dest('dist/components/'))
});

gulp.task('imagemin', () =>
    gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
);

gulp.task('server', function(){
  browserSync.init(null, {
    server: {baseDir: './dist/'}
  });
});

gulp.task('watch', function(){
  gulp.watch(dev_path.components + '*', ['components'])
  gulp.watch(dev_path.js + '*', ['compress']);
  gulp.watch(dev_path.img + '*', ['imagemin']);
  gulp.watch(dev_path.font + '*', ['font']);
  gulp.watch(dev_path.jade + '**/*.jade', ['jade']);
  gulp.watch(dev_path.sass + '**/*.scss', ['sass']);
});

gulp.task('default', [
  'jade', 'sass', 'server', 'watch'
]);
