(function(){
'use strict';

angular.module('irdenPage.feedback', [])

.controller('FeedbackCtrl', function($http, hostConfig) {
  var feedbackCtrl = this;
  feedbackCtrl.feedback = {};
  feedbackCtrl.numPerPage = 5;
  feedbackCtrl.numPages = 0;
  feedbackCtrl.bigCurrentPage = 1;
  feedbackCtrl.listUrl = hostConfig.url+hostConfig.port+'/feedbacks/?limit='+feedbackCtrl.numPerPage+'&offset='+
                    (feedbackCtrl.bigCurrentPage-1)*feedbackCtrl.numPerPage;
/**
  @function getFeedbacksList
  @param method - HTTP method
  @param url - end point to service
  @return status and list of feedbacks from server
*/
  feedbackCtrl.getFeedbacksList = function(){
    $http({method: 'GET', url:feedbackCtrl.listUrl }).
         then(function(response) {
           feedbackCtrl.status = response.status;
           feedbackCtrl.feedbacks = response.data;
         }, function(response) {
           feedbackCtrl.data = response.data || "Request failed";
           feedbackCtrl.status = response.status;
       });
   };
   feedbackCtrl.getFeedbacksList();

   /**
     @function postFeedback
     @param data - just form data which saved in object
     @return result of saving data
   */
   feedbackCtrl.postFeedback = function(){
      $http({
        method: 'POST',
        url: hostConfig.url+hostConfig.port+'/feedbacks/',
        data: feedbackCtrl.feedback
        }).then(function successCallback(response) {
          feedbackCtrl.getFeedbacksList();
          feedbackCtrl.feedback = {};
        }, function errorCallback(response) {

        });
   };
  //Rating variables
   feedbackCtrl.rate = 7;
   feedbackCtrl.max = 10;
   feedbackCtrl.isReadonly = false;

   feedbackCtrl.hoveringOver = function(value) {
      feedbackCtrl.overStar = value;
      feedbackCtrl.percent = 100 * (value / feedbackCtrl.max);
  };

  //Paginator variables
      feedbackCtrl.maxSize = 5;
      feedbackCtrl.changePage = function() {
        feedbackCtrl.listUrl = hostConfig.url+hostConfig.port+'/feedbacks/?limit='+feedbackCtrl.numPerPage+'&offset='+
                          (feedbackCtrl.bigCurrentPage-1)*feedbackCtrl.numPerPage;
        feedbackCtrl.getFeedbacksList();
      }
  //end

  });
})();
