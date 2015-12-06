module.exports = function(config){
  config.set({

    basePath : './',

    files : [
    //  'app/bower_components/angular-route/angular-route.js',
    //  'app/bower_components/angular-mocks/angular-mocks.js',
      "./build/js/components.min.js",
      "./app/app.js",
      "./appviews/about_us.js",
      "./appviews/confirmation.js",
      "./appviews/feedback.js",
      "./appviews/final.js",
      "./appviews/main.js",
      "./appviews/price.js",      
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
