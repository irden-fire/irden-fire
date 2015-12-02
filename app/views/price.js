(function(){
'use strict';

angular.module('irdenPage.price', ['ui.bootstrap'])

.controller('PriceCtrl', function($scope, $http, hostConfig) {
  var priceCtrl = this;
  /**
    @function getFeedbacksList
    @param method - HTTP method
    @param url - end point to service
    @return status and list of feedbacks from server
  */
    (function(){
      $http({method: 'GET', url: hostConfig.url+hostConfig.port+'/prices/'}).
           then(function(response) {
             $scope.status = response.status;
             $scope.data = response.data;
           }, function(response) {
             $scope.data = response.data || "Request failed";
             $scope.status = response.status;
         });
     })();
/**
  @global set description panels state by default (true = panels was closed)
*/
  priceCtrl.isCollapsed = true;
});
})();
