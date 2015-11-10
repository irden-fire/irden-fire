(function(){
'use strict';

angular.module('irdenPage.main', [])

.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
  /**
    @function getFeedbacksList
    @param method - HTTP method
    @param url - end point to service
    @return status and list of feedbacks from server
  */
      $http({method: 'GET', url: 'http://127.0.0.1:8000/feedbacks/?limit=3'}).
           then(function(response) {
             $scope.status = response.status;
             $scope.data = response.data;
           }, function(response) {
             $scope.data = response.data || "Request failed";
             $scope.status = response.status;
         });
}]);
})();