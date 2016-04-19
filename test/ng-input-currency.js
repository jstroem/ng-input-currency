angular.module('test', []);

describe ('ngInputCurrency', function () {

  var element, scope, util;

  beforeEach(function() {
    module('test');
    module('ngInputCurrency');
    inject(function ($compile, $rootScope, ngInputCurrencyService) {
      // vanilla
      scope = $rootScope.$new(true);
      util = ngInputCurrencyService;
      element = angular.element('<input type="text" ng-model="value" ng-input-currency>');
      angular.element(document.body).append(element);
      $compile(element)(scope);
      scope.$digest();
    });
  });

  describe('ngInputCurrency', function () {
  });

  describe ('ngInputCurrencyService', function () {
  });
});
