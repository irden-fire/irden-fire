// Karma configuration
// Generated on Fri Dec 04 2015 23:39:00 GMT+0300 (MSK)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'app/bower_components/jquery/jquery.js',
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-sanitize/angular-sanitize.js',
      'app/bower_components/angular-loader/angular-loader.js',
      'app/bower_components/angular-translate/angular-translate.js',
      'app/bower_components/angular-cookies/angular-cookies.js',
      'app/bower_components/angular-translate-loader-partial/angular-translate-loader-partial.js',
      'app/bower_components/angular-translate-loader-url/angular-translate-loader-url.js',
      'app/bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
      'app/bower_components/angular-translate-storage-local/angular-translate-storage-local.js',
      'app/bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
      'app/bower_components/angular-animate/angular-animate.js',
      'app/bower_components/bootstrap/bootstrap.js',
      'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'app/bower_components/angular-ui-mask/mask.js',
      'app/bower_components/angular-loading-bar/loading-bar.js',
      'app/bower_components/angular-mocks/angular-mocks.js',      
      'app/app.js',
      'app/views/*.js',
      'app/tests/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],

    junitReporter   : {
        outputFile: 'test_out/unit.xml',
        suite     : 'unit'
    },
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    //  'app/app.js': ['coverage']
    //  'app/app.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: {
        type: 'html',
        dir : 'coverage/'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity
  })
}
