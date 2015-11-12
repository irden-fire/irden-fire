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
//Initialization params
  $scope.customer = {};
  $scope.customer.price = $routeParams.param;

//Initialization date-picker params and function
  $scope.format = 'yyyy-MMMM-dd';
  $scope.maxDate = new Date(2020, 5, 22);
  $scope.minDate = new Date();
  $scope.customer.desired_date = new Date();
  $scope.dateOptions = {
    formatYear: 'yyyy',
    startingDay: 1
  };
  $scope.status = {
    opened: false
  };

  $scope.open = function($event) {
    $scope.status.opened = true;
  };
//Initialization time-picker params and functions
  $scope.hstep = 1;
  $scope.mstep = 15;
  $scope.customer.desired_time = new Date(0,0,0,0,0);
  $scope.ismeridian = false;

  //Form post function
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
