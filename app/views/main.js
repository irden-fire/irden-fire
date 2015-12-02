(function(){
'use strict';

angular.module('irdenPage.main', [])

.controller('MainCtrl', function($http, hostConfig) {
  console.log('Controller initialization');
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
    /*  var lang = {};
      var _this = this;
      $http.get('assets/languages/en_us.json').success(function(data) {
         _this.lang = data;
      //   console.log(_this.lang);
    });*/
});
})();
