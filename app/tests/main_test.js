'use strict';

describe('irdenPage.main module', function() {

//  beforeEach(module('irdenPage.main'));
  beforeEach(inject(function ($rootScope, $controller _$location_) {
    $location = _$location_;
    scope = $rootScope.$new();

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      MainCtrl = $controller('MainCtrl', {
        $scope: scope
      });
    }));
    createController = function() {
            return $controller('NavCtrl', {
                '$scope': scope
            });

  describe('main controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var mainCtrl = $controller('MainCtrl');
      expect(mainCtrl).toBeDefined();
    }));

  });
});
