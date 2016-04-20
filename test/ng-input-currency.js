angular.module('test', []);

describe ('ngInputCurrency', function () {

  var element, scope, util, currencyFilter, locale;

  beforeEach(function() {
    jasmine.clock().install();

    module('test');
    module('ngInputCurrency');

    inject(function ($compile, $rootScope, ngInputCurrencyService, $filter, $locale) {
      // vanilla
      locale = $locale;
      scope = $rootScope.$new(true);
      util = ngInputCurrencyService;
      currencyFilter = $filter('currency');
      element = angular.element('<input type="text" ng-model="value" ng-input-currency>');
      angular.element(document.body).append(element);
      $compile(element)(scope);
      scope.$digest();
    });
  });

  var setViewValue = function(element, value) {
    element.val(value).triggerHandler('change');
  }

  var setModelValue = function(element, value) {
    scope.$apply( function() {
      scope[element.attr('ng-model')] = value;
    });
  }

  var focusElement = function(element) {
    element.triggerHandler('focus');
  }

  var blurElement = function(element) {
    element.triggerHandler('blur');
  }

  describe('ngInputCurrency', function () {
    it('should format model values as currencies when not focused', function(){
      blurElement(element);

      setModelValue(element, 0);
      expect(element.val()).toEqual(currencyFilter(0));

      setModelValue(element, 123);
      expect(element.val()).toEqual(currencyFilter(123));

      setModelValue(element, 123.50);
      expect(element.val()).toEqual(currencyFilter(123.50));

      setModelValue(element, 'foo');
      expect(element.val()).toEqual(currencyFilter('foo'));
    });

    it('should format model values as floats when focused', function(){
      blurElement(element);

      setModelValue(element, 0);
      focusElement(element);
      expect(element.val()).toEqual('0');
      blurElement(element);

      setModelValue(element, 123);
      focusElement(element);
      expect(element.val()).toEqual('123');
      blurElement(element);

      setModelValue(element, 123.50);
      focusElement(element);
      expect(element.val()).toEqual('123.5');
      blurElement(element);

      setModelValue(element, 'foo');
      focusElement(element);
      expect(element.val()).toEqual('');
      blurElement(element);
    });

    it('should first update the model once the element is blurred.', function(){

      blurElement(element);
      expect(scope.value).toBeUndefined();

      focusElement(element);
      setViewValue(element, '0');
      expect(element.val()).toEqual('0');
      expect(scope.value).toBeUndefined();
      blurElement(element);
      expect(scope.value).toBe(0);
      expect(element.val()).toBe(currencyFilter(scope.value));

      setViewValue(element, '123');
      expect(element.val()).toEqual('123');
      expect(scope.value).toBe(0);
      blurElement(element);
      expect(scope.value).toBe(123);
      expect(element.val()).toBe(currencyFilter(scope.value));

      setViewValue(element, '123.50');
      expect(element.val()).toEqual('123.50');
      expect(scope.value).toBe(123);
      blurElement(element);
      expect(scope.value).toBe(123.50);
      expect(element.val()).toBe(currencyFilter(scope.value));

      setViewValue(element, 'foo');
      expect(element.val()).toEqual('foo');
      expect(scope.value).toBe(123.50);
      blurElement(element);
      expect(scope.value).toBeUndefined();
      expect(element.val()).toBe('foo');
    })
  });

  describe ('ngInputCurrencyService', function () {
    describe('.toFloat', function() {
      it('Should on any other input than strings throw an TypeError', function(){
        expect(function() { util.toFloat(true) }).toThrowError(TypeError);
        expect(function() { util.toFloat({}) }).toThrowError(TypeError);
        expect(function() { util.toFloat([]) }).toThrowError(TypeError);
        expect(function() { util.toFloat(function(){}) }).toThrowError(TypeError);
      });

      it('Should be able to take a currency made by the angular currency filter an uncurrency it,', function(){
        expect(util.toFloat(currencyFilter(9999))).toBe(9999.00);
        expect(util.toFloat(currencyFilter(12.23))).toBe(12.23);
        expect(util.toFloat(currencyFilter(1))).toBe(1.00);
      });

      it('should be able to take a number as well', function(){
        expect(util.toFloat(9999)).toBe(9999.00);
        expect(util.toFloat(12.23)).toBe(12.23);
        expect(util.toFloat(1)).toBe(1.00);
      });
    });

    describe('.isValid', function(){
      it('should be able to check if something is a number or not', function(){
        expect(util.isValid('')).toBe(false);
        expect(util.isValid(false)).toBe(false);
        expect(util.isValid(0)).toBe(true);
        expect(util.isValid(0.99)).toBe(true);
        expect(util.isValid(1234)).toBe(true);
        expect(util.isValid(NaN)).toBe(false);
      });
    });

    describe('.preformatValue', function(){
      it('should change the GROUP_SEP to a . if the GROUP_SEP only exists one place and DECIMAL_SEP does not exists', function(){
        expect(util.preformatValue('123' + locale.NUMBER_FORMATS.GROUP_SEP + '45')).toBe('123.45');
        expect(util.preformatValue('123' + locale.NUMBER_FORMATS.GROUP_SEP + '456'+locale.NUMBER_FORMATS.GROUP_SEP+'789')).toBe('123' + locale.NUMBER_FORMATS.GROUP_SEP + '456'+locale.NUMBER_FORMATS.GROUP_SEP+'789');
        expect(util.preformatValue('123' + locale.NUMBER_FORMATS.GROUP_SEP + '456'+locale.NUMBER_FORMATS.DECIMAL_SEP+'789')).toBe('123' + locale.NUMBER_FORMATS.GROUP_SEP + '456'+locale.NUMBER_FORMATS.DECIMAL_SEP+'789');
      });

      it('should change the DECIMAL_SEP to a . if the DECIMAL_SEP only exists one place and GROUP_SEP does not exists', function(){
        expect(util.preformatValue('123' + locale.NUMBER_FORMATS.DECIMAL_SEP + '45')).toBe('123.45');
        expect(util.preformatValue('123' + locale.NUMBER_FORMATS.DECIMAL_SEP + '456'+locale.NUMBER_FORMATS.DECIMAL_SEP+'789')).toBe('123' + locale.NUMBER_FORMATS.DECIMAL_SEP + '456'+locale.NUMBER_FORMATS.DECIMAL_SEP+'789');
        expect(util.preformatValue('123' + locale.NUMBER_FORMATS.DECIMAL_SEP + '456'+locale.NUMBER_FORMATS.GROUP_SEP+'789')).toBe('123' + locale.NUMBER_FORMATS.DECIMAL_SEP + '456'+locale.NUMBER_FORMATS.GROUP_SEP+'789');
      });

      it('should return the same thing back on anything other than a string', function(){
        expect(util.preformatValue(undefined)).toBe(undefined);
        expect(util.preformatValue(null)).toBe(null);
        expect(util.preformatValue(false)).toBe(false);
        expect(util.preformatValue(123)).toBe(123);
        expect(util.preformatValue([])).toEqual([]);
        expect(util.preformatValue({})).toEqual({});
      });
    })

    describe('.stringToRegExp', function(){
      it('should be able to convert a given string to e regular expression safe string', function(){
        expect(util.stringToRegExp('.[]()-_,.$?^|test')).toBe('\\.\\[\\]\\(\\)\\-\\_\\,\\.\\$\\?\\^\\|test');
      });

      it('should be able to convert all strings into safe strings used in regular expresions', function(){
        expect(new RegExp('^'+util.stringToRegExp('.[]()-_,.$?^|test')+'$').test('.[]()-_,.$?^|test')).toBe(true);
        expect(new RegExp('^'+util.stringToRegExp('.[]()-_,.$?^|test')+'$').test('..[]()-_,.$?^|test')).toBe(false);
      });
    })
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });
});
