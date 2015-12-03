(function(){
'use strict';

angular.module('irdenPage.price', ['ui.bootstrap'])

.controller('PriceCtrl', function($scope, $http, $translate, hostConfig, $window) {
  var priceCtrl = this;
  //If locale is changing right now - get it through async method,
  //else get it from local storage
  if($translate.proposedLanguage() != undefined)
   priceCtrl.currentLang = $translate.proposedLanguage();
  else
    priceCtrl.currentLang = $window.localStorage.getItem('NG_TRANSLATE_LANG_KEY');

  console.log('lang:'+priceCtrl.currentLang);

  /**
    @function getFeedbacksList
    @param method - HTTP method
    @param url - end point to service
    @return status and list of feedbacks from server
  */
    (function(){
      $http({method: 'GET', url: hostConfig.url+hostConfig.port+'/prices/'}).
           then(function(response) {
             priceCtrl.status = response.status;
             priceCtrl.prices = response.data;

             priceCtrl.prices.results.forEach(function(programm) {
               var currentLocale = 0;
               //Go through all locales, if no one fit, get values by default 
               for(var currentLocale = 0; currentLocale < programm.description_l18n.length; currentLocale++){
                 if(programm.description_l18n[currentLocale].language == priceCtrl.currentLang){
                   programm.name = programm.description_l18n[currentLocale].name;
                   programm.description = programm.description_l18n[currentLocale].description;
                   return;
                 }
               }
             });

           }, function(response) {
             priceCtrl.data = response.data || "Request failed";
             priceCtrl.status = response.status;
         });
     })();
/**
  @global set description panels state by default (true = panels was closed)
*/
  priceCtrl.isCollapsed = true;
});
})();
