var gulp = require('gulp');
var browserify = require('browserify');
var karma = require('karma').server;
var coveralls = require('gulp-coveralls');
var run = require('run-sequence');
var watch = require('gulp-watch');
var shell = require('gulp-shell');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var rename = require('gulp-rename');

var conf = {
    'js': 'src/**/*.js',
    'src': 'src/',
    'dest': 'dist/',
    'file': 'ng-input-currency.js'
};

gulp.task('coveralls', function () {
  gulp.src('coverage/**/lcov.info').pipe(coveralls());
});

gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js'
  }, function (exitCode) {
    if (exitCode === 0)
      done();
    else
      process.exit(exitCode);
  });
});

gulp.task('publish', shell.task([
    'npm version patch',
    'npm publish'
]));

gulp.task('build:src', function() {
  var b = browserify({
    entries: conf.src + conf.file,
    debug: true
  });

  return b.bundle()
    .pipe(source(conf.file))
    .pipe(buffer())
    .pipe(gulp.dest(conf.dest))
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(rename({ extname: '.min.js' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(conf.dest));
});

gulp.task('build', function(){
  return run('build:src', 'test', 'coveralls');
});

gulp.task('watch:test', function(done){
  karma.start({
    autoWatch: true,
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }, done);
});

gulp.task('watch:build', function() {
  watch(conf.js, function(){
    gulp.start('build:src');
  });
});

gulp.task('watch', ['watch:build','watch:test']);
