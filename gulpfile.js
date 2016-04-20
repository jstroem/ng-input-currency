var gulp = require('gulp');
var browserify = require('gulp-browserify');
var karma = require('karma').server;
var coveralls = require('gulp-coveralls');
var run = require('run-sequence');
var watch = require('gulp-watch');
var shell = require('gulp-shell');

var conf = {
    'js': 'src/**/*.js',
    'dest': 'dist/'
}

gulp.task('coveralls', function () {
  gulp.src('coverage/**/lcov.info').pipe(coveralls());
});

gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js'
  }, function (exitCode) {
    if (exitCode == 0)
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
  return gulp.src(conf.js).pipe(browserify()).pipe(gulp.dest(conf.dest));
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
})

gulp.task('watch', ['watch:build','watch:test']);
