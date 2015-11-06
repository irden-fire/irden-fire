(function(){
'use strict';

function config ($routeProvider, $locationProvider) {
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
}
// Declare app level module which depends on views, and components
angular
.module('irdenPage', [
  'ngRoute',
  'ngAnimate',
  'ui.bootstrap',
  'irdenPage.about_us',
  'irdenPage.main',
  'irdenPage.feedback',
  'irdenPage.price',
  'irdenPage.confirmation',
  'irdenPage.final',
])
.config(config);
  // configure html5 to get links working on jsfiddle
})();
