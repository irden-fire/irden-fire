(function(){
'use strict';

angular.module('irdenPage.final', [])

.controller('FinalCtrl', function($scope, $location, $routeParams, $http) {

  $scope.register = function(username, password){
    $http({method: 'POST', url: 'http://127.0.0.1:8000/api/v1/create_user/',
           data: {
            username: username,
            password: password,
            userdata: $scope.customer.user_data
           }
         }).
         then(function success(response) {
           $scope.login(username, password);
           return response;
         }, function handleError(response) {
           console.log("error.");
       });
  }
});
})();
