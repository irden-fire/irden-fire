'use strict';

describe('irdenPage.main module', function() {
  var  $httpBackend,
    createController, hostConfig, feedbacks;

    hostConfig = {
            "url": "http://127.0.0.1",
            "port": ":8000"
        };

    beforeEach(module('irdenPage.main'));

    beforeEach(inject(function($injector){
      $httpBackend = $injector.get('$httpBackend');

    feedbacks = $httpBackend.when('GET', hostConfig.url+hostConfig.port+'/feedbacks/?limit=3')
                  .respond({feedbacks: {results: ['feedback1', 'feedback2', 'feedback3'] }});

    var $controller = $injector.get('$controller');

    createController = function(){
      return $controller('MainCtrl', {hostConfig: hostConfig});
    };
}));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should get feedbacks', function(){
    $httpBackend.expectGET(hostConfig.url+hostConfig.port+'/feedbacks/?limit=3');
    var mainCtrl = {};
    var controller = createController('MainCtrl', {mainCtrl : mainCtrl});
    $httpBackend.flush();
  });

  it('shouldn\'t get feedbacks', function(){
    feedbacks.respond(404, '');

    $httpBackend.expectGET(hostConfig.url+hostConfig.port+'/feedbacks/?limit=3');
    var mainCtrl = {};
    var controller = createController('MainCtrl', {mainCtrl : mainCtrl});
    $httpBackend.flush();
    expect(mainCtrl.status).toEqual(404);
    //expect(mainCtrl.feedbacks.length).toBeGreaterThan(0);
  });
});
