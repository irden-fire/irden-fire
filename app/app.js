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
    $httpProvider.interceptors.push('AuthInterceptor');

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
  'angular-loading-bar',
  'ngCookies',
  'ui.bootstrap',
  'ngSanitize',
  'ui.mask',
  'pascalprecht.translate',
  'irdenPage.about_us',
  'irdenPage.main',
  'irdenPage.feedback',
  'irdenPage.price',
  'irdenPage.confirmation',
  'irdenPage.final',
])
.config(config)
.controller('TranslateController', function($translate, $scope, $http, AuthTokenFactory) {
  $scope.customer = {};

  $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
    console.log("lang:"+langKey);
  };

  this.getUserData = function(){
     $http({method: 'GET', url: 'http://127.0.0.1:8000/api/v1/current_user/'}).
          then(function(response) {
            var current_user = response.data;
            $scope.customer.client_name = current_user.full_name;
            $scope.customer.contact_number = current_user.phone_number;
            $scope.customer.email = current_user.email;
          }, function(response) {

        });
  };
  this.getUserData();

  var _this = this;
  $scope.login = function(username, password){
    $http({method: 'POST', url: 'http://127.0.0.1:8000/api/v1/auth/login/',
           data: {
            username: username,
            password: password
           }
         }).
         then(function success(response) {
           AuthTokenFactory.setToken(response.data.token);
           _this.getUserData();
           return response;
         }, function handleError(response) {
           console.log("error:"+response.data);
       });
  }

  $scope.logout = function(){
    AuthTokenFactory.setToken();
    $scope.customer = {};
  };

})
.factory('AuthTokenFactory', function AuthTokenFactory($window){
    'use strict';
    var store = $window.localStorage;
    var key = 'auth-token';

    return {
      getToken: getToken,
      setToken: setToken
    };

    function getToken() {
      return store.getItem(key);
    };

    function setToken(token) {
      if (token) {
        store.setItem(key, token);
      } else {
        store.removeItem(key);
      }
    };
})

.factory('AuthInterceptor', function AuthInterceptor(AuthTokenFactory){
    'use strict';
    return{
      request: addToken
    };

    function addToken(config){
      var token = AuthTokenFactory.getToken();
      if (token){
        config.headers = config.headers || {};
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    }
});

})();
