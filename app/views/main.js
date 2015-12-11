(function(){
'use strict';

angular.module('irdenPage.main', [])

.controller('MainCtrl', [ '$http', 'hostConfig', function($http, hostConfig) {
  var mainCtrl = this;
  /**
    @function getFeedbacksList
    @param method - HTTP method
    @param url - end point to service
    @return status and list of feedbacks from server
  */
      $http({method: 'GET', url: hostConfig.url+hostConfig.port+'/feedbacks/?limit=3'}).
           then(function(response) {
             mainCtrl.status = response.status;
             mainCtrl.feedbacks = response.data;
           }, function(response) {
             mainCtrl.data = response.data || "Request failed";
             mainCtrl.status = response.status;
         });
}]);
})();
