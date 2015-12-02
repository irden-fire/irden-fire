(function(){
'use strict';

angular.module('irdenPage.confirmation', [])

.controller('ConfirmationCtrl', function($scope, $location, $routeParams, $http) {
  // $scope.customer = {};
  var confirmCtrl = this;

   $http({method: 'GET', url: 'http://127.0.0.1:8000/prices/'+$routeParams.price+'/'}).
        then(function(response) {
          $scope.confirming_order = response.data;
        }, function(response) {
          $scope.confirming_order = response.data || "Request failed";
      });

//  $scope.getUserData = function(){

//   }

//Initialization params
  confirmCtrl.user = {};
  $scope.customer.order = {};
  $scope.customer.order.price = $routeParams.price;
  confirmCtrl.in_progress = false;

//Initialization date-picker params and function
  confirmCtrl.format = 'yyyy-MMMM-dd';
  confirmCtrl.maxDate = new Date(2020, 5, 22);
  confirmCtrl.minDate = new Date();
  $scope.customer.order.desired_date = new Date();
  $scope.customer.order.desired_date.setHours(21);
  $scope.customer.order.desired_date.setMinutes(0);

  confirmCtrl.dateOptions = {
    formatYear: 'yyyy',
    startingDay: 1
  };

  confirmCtrl.calendar_status = {
    opened: false
  };

  confirmCtrl.open = function($event) {
    confirmCtrl.calendar_status.opened = true;
  };
//Initialization time-picker params and functions
  confirmCtrl.hstep = 1;
  confirmCtrl.mstep = 15;
  confirmCtrl.ismeridian = false;

  //Form post function
  confirmCtrl.post = function(client_name, contact_number, email, pk, username, password, order){
    //TODO clean this mess up!!!!
    var preparedData = {}
    if(username != null){
      preparedData = {
        client_name: client_name,
        contact_number: contact_number,
        email: email,
        id: pk,
        user: {username: username, password: password},
        orders: [order]
      };
    }
    else{
      preparedData = {
        client_name: client_name,
        contact_number: contact_number,
        email: email,
        id: pk,
        orders: [order]
      };
    }

    confirmCtrl.in_progress = true;

    if(pk == null){
      $http({
        method: 'POST',
        url: 'http://127.0.0.1:8000/create_user_data/',
        data: preparedData
        }).then(function successCallback(response) {
          $location.path('/final').replace();
        }, function errorCallback(response) {
          confirmCtrl.in_progress = false;
        });
    }else{
    $http({
      method: 'PUT',
      url: 'http://127.0.0.1:8000/update_user_data/'+pk+'/',
      data: preparedData
      }).then(function successCallback(response) {
        $location.path('/final').replace();
      }, function errorCallback(response) {
        confirmCtrl.in_progress = false;
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
