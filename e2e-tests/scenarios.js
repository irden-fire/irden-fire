'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /main when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/");
  });


  describe('main', function() {

    beforeEach(function() {
      browser.get('index.html/');
    });

    it('should render main when user navigates to /', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/Hello dear visitor. Here you can get general information about us, our services, and place an order or leave feedback./);
    });

  });


  describe('price', function() {

    beforeEach(function() {
      browser.get('index.html/price');
    });


    it('should render price when user navigates to /price', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/Here you can find detailed information about our prices/);
    });

  });
});
