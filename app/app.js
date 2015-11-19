(function(){
'use strict';

function config ($routeProvider, $locationProvider, $httpProvider, $translateProvider) {
    $routeProvider
    .when('/', {
     templateUrl: '/views/main.html',
     controller: 'MainCtrl',
    })
    .when('/about', {
      templateUrl: '/views/about_us.html',
      controller: 'AboutUsCtrl',
    })
    .when('/feedback', {
      templateUrl: '/views/feedback.html',
      controller: 'FeedbackCtrl',
    })
    .when('/price', {
      templateUrl: '/views/price.html',
      controller: 'PriceCtrl',
    })
    .when('/confirmation/:param', {
      templateUrl: '/views/confirmation.html',
      controller: 'ConfirmationCtrl',
    })
    .when('/final', {
      templateUrl: '/views/final.html',
      controller: 'FinalCtrl',
    });

    $locationProvider.html5Mode(true);
    $routeProvider.otherwise("/");
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

    $translateProvider.useStaticFilesLoader({
      prefix: 'assets/translations/',
      suffix: '.json'
    });

    $translateProvider.preferredLanguage('en');

    // Tell the module to store the language in the local storage
    $translateProvider.useLocalStorage();
    $translateProvider.useSanitizeValueStrategy('escape');
}
// Declare app level module which depends on views, and components
angular
.module('irdenPage', [
  'ngRoute',
  'ngAnimate',
  'ngCookies',
  'ui.bootstrap',
  'ngSanitize',
  'pascalprecht.translate',
  'irdenPage.about_us',
  'irdenPage.main',
  'irdenPage.feedback',
  'irdenPage.price',
  'irdenPage.confirmation',
  'irdenPage.final',
])
.config(config)
.controller('TranslateController', function($translate, $scope) {
  $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
    console.log("lang:"+langKey);
  };
});
  // configure html5 to get links working on jsfiddle
})();
