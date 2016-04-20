module.exports = function (config) {
  config.set({
    autoWatch: false,
    browsers: ['Chrome'],
    browserNoActivityTimeout: 30000,
    client: {
      captureConsole: true
    },
    frameworks: ['jasmine'],
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/angular-i18n/angular-locale_da-dk.js', //Test with custom setup
      'dist/ng-input-currency.js',
      'test/ng-input-currency.js'
    ],
    logLevel: config.LOG_INFO,
    singleRun: true,

    // coverage
    coverageReporter: {
      type : 'lcov',
      dir : 'coverage/',
    },
    preprocessors: {
      'dist/ng-input-currency.js': ['coverage']
    },
    reporters: ['progress', 'coverage']
  })
}
