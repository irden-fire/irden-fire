(function(){
'use strict';

angular.module('irdenPage.confirmation', [])

.controller('ConfirmationCtrl', function($scope, $location, $routeParams, $http) {
  // $scope.customer = {};

   $http({method: 'GET', url: 'http://127.0.0.1:8000/prices/'+$routeParams.price+'/'}).
        then(function(response) {
          $scope.confirming_order = response.data;
        }, function(response) {
          $scope.confirming_order = response.data || "Request failed";
      });

//  $scope.getUserData = function(){

//   }

//Initialization params
  $scope.user = {};
  $scope.customer.order = {};
  $scope.customer.order.price = $routeParams.price;
  $scope.in_progress = false;

//Initialization date-picker params and function
  $scope.format = 'yyyy-MMMM-dd';
  $scope.maxDate = new Date(2020, 5, 22);
  $scope.minDate = new Date();
  $scope.customer.desired_date = new Date();
  $scope.customer.desired_date.setHours(21);
  $scope.customer.desired_date.setMinutes(0);

  $scope.dateOptions = {
    formatYear: 'yyyy',
    startingDay: 1
  };

  $scope.calendar_status = {
    opened: false
  };

  $scope.open = function($event) {
    $scope.calendar_status.opened = true;
  };
//Initialization time-picker params and functions
  $scope.hstep = 1;
  $scope.mstep = 15;
  $scope.ismeridian = false;

  //Form post function
  $scope.post = function(){
    //TODO clean this mess up!!!!
    if(Object.keys($scope.user).length != 0){
      $scope.preparedData = {
        client_name: $scope.customer.user_data.client_name,
        contact_number: $scope.customer.user_data.contact_number,
        email: $scope.customer.user_data.email,
        id: $scope.customer.user_data.pk,
        user: {username: $scope.user.username, password: $scope.user.password},
        orders: [$scope.customer.order]
      };
    }
    else{
      $scope.preparedData = {
        client_name: $scope.customer.user_data.client_name,
        contact_number: $scope.customer.user_data.contact_number,
        email: $scope.customer.user_data.email,
        id: $scope.customer.user_data.pk,
        orders: [$scope.customer.order]
      };
    }

    $scope.in_progress = true;

    if($scope.customer.user_data.pk == null){
      $http({
        method: 'POST',
        url: 'http://127.0.0.1:8000/create_user_data/',
        data: $scope.preparedData
        }).then(function successCallback(response) {
          $location.path('/final').replace();
        }, function errorCallback(response) {
          $scope.in_progress = false;
        });
    }else{
    $http({
      method: 'PUT',
      url: 'http://127.0.0.1:8000/update_user_data/'+$scope.customer.user_data.pk+'/',
      data: $scope.preparedData
      }).then(function successCallback(response) {
        $location.path('/final').replace();
      }, function errorCallback(response) {
        $scope.in_progress = false;
      });
    }
  };

})

.directive('validUsername', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue) {
                // Any way to read the results of a "required" angular validator here?
                var isBlank = viewValue === ''
                var invalidChars = !isBlank && !/^[A-z0-9]+$/.test(viewValue)
                var invalidLen = !isBlank && !invalidChars && (viewValue.length < 3 || viewValue.length > 60)
                ctrl.$setValidity('isBlank', !isBlank)
                ctrl.$setValidity('invalidChars', !invalidChars)
                ctrl.$setValidity('invalidLen', !invalidLen)
                scope.usernameGood = !isBlank && !invalidChars && !invalidLen

            })
        }
    }
});
})();
