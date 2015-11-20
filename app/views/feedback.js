(function(){
'use strict';

angular.module('irdenPage.feedback', [])

.controller('FeedbackCtrl', ['$scope', '$http', function($scope, $http) {
//  $scope.Math = window.Math;
  $scope.numPerPage = 5;
  $scope.numPages = 0;
  $scope.bigCurrentPage = 1;
  $scope.listUrl = 'http://127.0.0.1:8000/feedbacks/?limit='+$scope.numPerPage+'&offset='+
                    ($scope.bigCurrentPage-1)*$scope.numPerPage;
/**
  @function getFeedbacksList
  @param method - HTTP method
  @param url - end point to service
  @return status and list of feedbacks from server
*/
  $scope.getFeedbacksList = function(){
    $http({method: 'GET', url:$scope.listUrl }).
         then(function(response) {
           $scope.status = response.status;
           $scope.data = response.data;
         }, function(response) {
           $scope.data = response.data || "Request failed";
           $scope.status = response.status;
       });
   };
   $scope.getFeedbacksList();

   /**
     @function postFeedback
     @param data - just form data which saved in object
     @return result of saving data
   */
   $scope.postFeedback = function(){
      $http({
        method: 'POST',
        url: 'http://127.0.0.1:8000/feedbacks/',
        data: $scope.feedback
        }).then(function successCallback(response) {
          $scope.getFeedbacksList();
          $scope.feedback = {};
        }, function errorCallback(response) {

        });
   };
  //Rating variables
   $scope.rate = 7;
   $scope.max = 10;
   $scope.isReadonly = false;

   $scope.hoveringOver = function(value) {
      $scope.overStar = value;
      $scope.percent = 100 * (value / $scope.max);
  };

  //Paginator variables
      $scope.maxSize = 5;
      $scope.changePage = function() {
        $scope.listUrl = 'http://127.0.0.1:8000/feedbacks/?limit='+$scope.numPerPage+'&offset='+
                          ($scope.bigCurrentPage-1)*$scope.numPerPage;
        $scope.getFeedbacksList();
      }
  //end

   $scope.feedback = {};
/*
   $scope.post = function() {
     $scope.postFeedback($scope.feedback);
     $scope.feedback = {};
   };*/

}]);
})();
