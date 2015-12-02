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
.controller('TranslateController',
             function($translate, $scope, $http, $route,
                      AuthTokenFactory, hostConfig, UserData){

  var indexCtrl = this;
  console.log('Controller initialization');
  indexCtrl.customer = UserData.getUserData();
  indexCtrl.clearUserData = UserData.clearUserData;
  UserData.setUserData();
  //$scope.customer.user_data = {};
  $scope.weInSystem = false;

  indexCtrl.changeLanguage = function (langKey) {
    $translate.use(langKey);
    console.log("lang:"+langKey);
  };

  indexCtrl.login = function(username, password){
    $http({method: 'POST', url: hostConfig.url+hostConfig.port+'/api/v1/auth/login/',
           data: {
            username: username,
            password: password
           }
         }).
         then(function success(response) {
           AuthTokenFactory.setToken(response.data.token);
           UserData.setUserData();
           indexCtrl.customer = UserData.getUserData();
           $route.reload();
           //$scope.weInSystem = true;
           return response;
         }, function handleError(response) {
           console.log("error:"+response.data);
       });
  }

  indexCtrl.logout = function(){
    AuthTokenFactory.setToken();
    UserData.clearUserData();
    indexCtrl.customer = UserData.getUserData();
    $route.reload();
    indexCtrl.user = {};
  };

})
.factory('UserData', function UserData($http, hostConfig){
  'use strict';
  var userFactory = this;
  userFactory.customer = {};
  userFactory.customer.user_data = {};
  userFactory.customer.order = {};
  userFactory.customer.order.price = '';
  userFactory.customer.order.desired_date = new Date();
  userFactory.customer.order.desired_date.setHours(21);
  userFactory.customer.order.desired_date.setMinutes(0);

    function setUserData(){
      $http({method: 'GET', url: hostConfig.url+hostConfig.port+'/api/v1/current_user/'}).
                then(function(response) {
                  var current_user = response.data;
                  userFactory.customer.user_data.client_name = current_user.client_name;
                  userFactory.customer.user_data.contact_number = current_user.contact_number;
                  userFactory.customer.user_data.email = current_user.email;
                  userFactory.customer.user_data.pk = current_user.pk;
                }, function(response) {

                });
    }

    function clearUserData(){
      userFactory.customer = {};
      userFactory.customer.user_data = {};
      userFactory.customer.order = {};
      userFactory.customer.order.desired_date = new Date();
      userFactory.customer.order.desired_date.setHours(21);
      userFactory.customer.order.desired_date.setMinutes(0);
    }

    function getUserData(){
      return userFactory.customer;
    }

    return {
      getUserData: getUserData,
      clearUserData: clearUserData,
      setUserData: setUserData
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
