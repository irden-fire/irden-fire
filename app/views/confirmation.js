(function(){
'use strict';

angular.module('irdenPage.confirmation', [])

.controller('ConfirmationCtrl', function($scope, $location, $routeParams, $http) {

   $http({method: 'GET', url: 'http://127.0.0.1:8000/prices/'+$routeParams.param}).
        then(function(response) {
          $scope.status = response.status;
          $scope.data = response.data;
        }, function(response) {
          $scope.data = response.data || "Request failed";
          $scope.status = response.status;
      });

  $scope.customer = {};
  $scope.customer.price = $routeParams.param;

  $scope.post = function(){
    $http({
      method: 'POST',
      url: 'http://127.0.0.1:8000/orders/',
      data: $scope.customer
      }).then(function successCallback(response) {
        $location.path('/final').replace();
      }, function errorCallback(response) {

      });
  };


});
})();
