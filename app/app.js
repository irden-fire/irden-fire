(function(){
'use strict';

function config ($routeProvider, $locationProvider, $httpProvider, $translateProvider) {
    $routeProvider
    .when('/', {
     templateUrl: '/views/main.html',
     controller: 'MainCtrl as mainCtrl',
    })
    .when('/about', {
      templateUrl: '/views/about_us.html',
      controller: 'AboutUsCtrl',
    })

    .when('/feedback', {
      templateUrl: '/views/feedback.html',
      controller: 'FeedbackCtrl as feedbackCtrl',
    })
    .when('/price', {
      templateUrl: '/views/price.html',
      controller: 'PriceCtrl as priceCtrl',
    })
    .when('/confirmation/:price', {
      templateUrl: '/views/confirmation.html',
      controller: 'ConfirmationCtrl as confirmCtrl',
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

    $translateProvider.preferredLanguage('ru');

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
.constant("hostConfig", {
        "url": "http://127.0.0.1",
        "port": ":8000"
    })
.config(config)
.controller('TranslateController', function($translate, $scope, $http, AuthTokenFactory, hostConfig){
  var indexCtrl = this;

  $scope.customer = {};
  $scope.customer.user_data = {};
  $scope.weInSystem = false;

  indexCtrl.changeLanguage = function (langKey) {
    $translate.use(langKey);
    console.log("lang:"+langKey);
  };

//TODO make one service, which can login or register user, and change form data at the same time
//TODO deside how check is we in system or not
  $scope.getUserData = function(){
     $http({method: 'GET', url: hostConfig.url+hostConfig.port+'/api/v1/current_user/'}).
          then(function(response) {
            var current_user = response.data;
              $scope.customer.user_data.client_name = current_user.client_name;
              $scope.customer.user_data.contact_number = current_user.contact_number;
              $scope.customer.user_data.email = current_user.email;
              //$scope.customer.user_data.user = 123;//current_user.user;
              $scope.customer.user_data.pk = current_user.pk;
              $scope.weInSystem = true;

          }, function(response) {

          });
  };
  $scope.getUserData();

  indexCtrl.login = function(username, password){
    $http({method: 'POST', url: hostConfig.url+hostConfig.port+'/api/v1/auth/login/',
           data: {
            username: username,
            password: password
           }
         }).
         then(function success(response) {
           AuthTokenFactory.setToken(response.data.token);
           $scope.getUserData();
           $scope.weInSystem = true;
           return response;
         }, function handleError(response) {
           console.log("error:"+response.data);
       });
  }

  indexCtrl.logout = function(){
    AuthTokenFactory.setToken();
    $scope.customer = {};
    $scope.customer.order = {};
    $scope.customer.user_data = {};
    $scope.customer.order.desired_date = new Date();
    $scope.customer.order.desired_date.setHours(21);
    $scope.customer.order.desired_date.setMinutes(0);
    $scope.weInSystem = false;
    indexCtrl.user = {};
  };

})
.factory('GetUserDataFactory', function GetUserDataFactory($http){
  'use strict';
  var customer = {};
  customer.user_data = {};
  customer.order = {};

  function setUserData(){

  }

  function getUserData(){

  }

  function resetUserData(){

  }
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
