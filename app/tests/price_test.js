'use strict';

describe('irdenPage.price module', function() {
  var  $httpBackend, $translate, mockTranslateFilter, $translateProvider,
    createController, hostConfig, feedbacks;

    hostConfig = {
            "url": "http://127.0.0.1",
            "port": ":8000"
        };

    beforeEach(module('irdenPage.price', function($provide){
      $provide.factory('customLoader', function (value){
        return value;
      });
      $translateProvider.useLoader('customLoader');
    }));

    beforeEach(inject(function($injector){
      $httpBackend = $injector.get('$httpBackend');
      $translate = $injector.get('$translate');

    feedbacks = $httpBackend.when('GET', hostConfig.url+hostConfig.port+'/prices/')
                  .respond({feedbacks: {results: ['price1', 'price2', 'price3'] }});

    var $controller = $injector.get('$controller');

    createController = function(){
      return $controller('PriceCtrl', {hostConfig: hostConfig, $translate: $translate});
    };
}));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should get prices', function(){
    $httpBackend.expectGET(hostConfig.url+hostConfig.port+'/prices/');
    var mainCtrl = {};
    var controller = createController('PriceCtrl', {mainCtrl : mainCtrl, $translate: $translate});
    $httpBackend.flush();
    //expect(mainCtrl.feedbacks.length).toBeGreaterThan(0);
  });

  it('shouldn\'t get prices', function(){
    feedbacks.respond(404, '');

    $httpBackend.expectGET(hostConfig.url+hostConfig.port+'/prices/');
    var mainCtrl = {};
    var controller = createController('PriceCtrl', {mainCtrl : mainCtrl, $translate: $translate});
    $httpBackend.flush();
    //expect(mainCtrl.feedbacks.length).toBeGreaterThan(0);
  });
});
